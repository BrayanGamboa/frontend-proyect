import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./ProfileUser.css";
import { conexionBD } from "../services/ConexionBD";
import { profileSchema } from "../schemas/profileSchema";
import { usePhotoUpload } from "../hooks/usePhotoUpload";

const STORAGE_KEY = "ct_profile_doc";
const DEFAULT_DOCUMENT = "1234";

/* ── Field wrapper ───────────────────────────────────────────── */
function Field({ id, label, error, children }) {
  return (
    <div className="pf-field">
      <label className="pf-field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p className="pf-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ProfileUser() {
  const fileInputRef = useRef(null);

  /* ── Async / UI state ────────────────────────────────────────── */
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [saveError, setSaveError] = useState("");
  const [photoFileError, setPhotoFileError] = useState("");
  const [editMode, setEditMode] = useState(false);

  /* ── React Hook Form + Zod ───────────────────────────────────── */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      document: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedName = watch("name");

  /* ── Photo hook ──────────────────────────────────────────────── */
  const {
    preview,
    setPreview,
    uploading,
    uploadError,
    handleFileSelect,
    uploadPhoto,
  } = usePhotoUpload(null);

  /* ── Load user on mount ──────────────────────────────────────── */
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const storedDoc = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_DOCUMENT;

        const { data: allRows, error: allErr } = await conexionBD
          .from("tbl_user")
          .select("*");

        if (allErr) throw allErr;
        if (!allRows || allRows.length === 0)
          throw new Error(
            "La tabla tbl_user está vacía o sin permisos de lectura",
          );

        const user =
          allRows.find((r) => String(r.document) === String(storedDoc)) ??
          allRows.find(
            (r) => String(r.document) === String(DEFAULT_DOCUMENT),
          ) ??
          allRows[0];

        if (!user)
          throw new Error("No se encontró ningún usuario en la base de datos");

        localStorage.setItem(STORAGE_KEY, user.document);

        // Populate RHF form with fetched data
        reset({
          name: user.name ?? "",
          email: user.email ?? "",
          document: String(user.document ?? ""),
          password: "",
          confirmPassword: "",
        });

        if (user.url_image) setPreview(user.url_image);
      } catch (err) {
        setFetchError(err.message ?? "No se pudo cargar el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [reset, setPreview]);

  /* ── Edit mode helpers ──────────────────────────────────────── */
  const handleEdit = () => {
    setSuccessMsg("");
    setSaveError("");
    setEditMode(true);
  };

  const handleCancel = () => {
    reset();
    setPhotoFileError("");
    setEditMode(false);
    setSaveError("");
  };

  /* ── Avatar handlers ─────────────────────────────────────────── */
  const handleAvatarClick = () => {
    if (editMode) fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const err = handleFileSelect(selected);
    setPhotoFileError(err ?? "");
  };

  /* ── Form submit (called only when Zod passes) ───────────────── */
  const onSubmit = async (data) => {
    setSuccessMsg("");
    setSaveError("");
    setSaving(true);

    try {
      let url_image = preview;

      if (!photoFileError && fileInputRef.current?.files?.[0]) {
        const publicUrl = await uploadPhoto(data.document);
        if (publicUrl) {
          url_image = publicUrl;
        } else if (uploadError) {
          setSaveError(`Error al subir la imagen: ${uploadError}`);
          return;
        }
      }

      const { error: updateError } = await conexionBD
        .from("tbl_user")
        .update({ name: data.name, email: data.email, url_image })
        .eq("document", data.document);

      if (updateError) throw updateError;

      /* Password: update mock in localStorage only */
      if (data.password) {
        try {
          const stored = JSON.parse(localStorage.getItem("ct_user") ?? "{}");
          stored.password = data.password;
          localStorage.setItem("ct_user", JSON.stringify(stored));
        } catch {
          /* ignore */
        }
      }

      reset({ ...getValues(), password: "", confirmPassword: "" });
      setSuccessMsg("Perfil actualizado correctamente");
      setEditMode(false);
    } catch (err) {
      setSaveError(err.message ?? "Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  /* ── Render guards ───────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="pf-page">
        <div className="pf-loading" aria-live="polite">
          Cargando perfil…
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="pf-page">
        <div className="pf-error-box" role="alert">
          {fetchError}
        </div>
      </div>
    );
  }

  const isBusy = saving || uploading || isSubmitting;

  return (
    <div className="pf-page">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Configuración de perfil</h2>
          <p className="page-subtitle">Actualiza tu información personal</p>
        </div>
        {!editMode && (
          <button
            type="button"
            className="pf-btn pf-btn--outline"
            onClick={handleEdit}
          >
            ✏ Editar perfil
          </button>
        )}
      </div>

      {/* ── Card ────────────────────────────────────────────────── */}
      <div className="pf-card">
        <form className="pf-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* ── Avatar section ──────────────────────────────────── */}
          <div className="pf-avatar-section">
            <button
              type="button"
              className={`pf-avatar-btn ${!editMode ? "pf-avatar-btn--static" : ""}`}
              onClick={handleAvatarClick}
              aria-label={
                editMode ? "Cambiar foto de perfil" : "Foto de perfil"
              }
              title={editMode ? "Cambiar foto" : undefined}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Foto de perfil"
                  className="pf-avatar-img"
                />
              ) : (
                <span className="pf-avatar-placeholder" aria-hidden="true">
                  {watchedName ? watchedName.charAt(0).toUpperCase() : "?"}
                </span>
              )}
              {editMode && (
                <span className="pf-avatar-overlay" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Cambiar foto
                </span>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="pf-file-input"
              onChange={handleFileChange}
              aria-hidden="true"
              tabIndex={-1}
            />

            {photoFileError && (
              <p className="pf-field__error" role="alert">
                {photoFileError}
              </p>
            )}
            <p className="pf-avatar-hint">JPG, PNG, WebP o GIF · máx. 5 MB</p>
          </div>

          {/* ── Fields ──────────────────────────────────────────── */}
          <div className="pf-fields">
            <Field
              id="pf-name"
              label="Nombre completo"
              error={editMode ? errors.name?.message : undefined}
            >
              <input
                id="pf-name"
                type="text"
                className={`pf-input ${!editMode ? "pf-input--readonly" : errors.name ? "pf-input--error" : ""}`}
                placeholder="Tu nombre completo"
                autoComplete="name"
                readOnly={!editMode}
                {...register("name")}
              />
            </Field>

            <Field
              id="pf-email"
              label="Correo electrónico"
              error={editMode ? errors.email?.message : undefined}
            >
              <input
                id="pf-email"
                type="email"
                className={`pf-input ${!editMode ? "pf-input--readonly" : errors.email ? "pf-input--error" : ""}`}
                placeholder="correo@ejemplo.com"
                autoComplete="email"
                readOnly={!editMode}
                {...register("email")}
              />
            </Field>

            <Field
              id="pf-document"
              label="Documento / ID"
              error={errors.document?.message}
            >
              <input
                id="pf-document"
                type="text"
                className="pf-input pf-input--readonly"
                aria-readonly="true"
                title="El documento no se puede cambiar"
                readOnly
                {...register("document")}
              />
            </Field>

            {editMode && (
              <>
                <div className="pf-divider">
                  <span>Cambiar contraseña</span>
                </div>

                <Field
                  id="pf-password"
                  label="Nueva contraseña"
                  error={errors.password?.message}
                >
                  <input
                    id="pf-password"
                    type="password"
                    className={`pf-input ${errors.password ? "pf-input--error" : ""}`}
                    placeholder="Mínimo 8 caracteres (opcional)"
                    autoComplete="new-password"
                    {...register("password")}
                  />
                </Field>

                <Field
                  id="pf-confirmPassword"
                  label="Confirmar contraseña"
                  error={errors.confirmPassword?.message}
                >
                  <input
                    id="pf-confirmPassword"
                    type="password"
                    className={`pf-input ${errors.confirmPassword ? "pf-input--error" : ""}`}
                    placeholder="Repite la nueva contraseña"
                    autoComplete="new-password"
                    {...register("confirmPassword")}
                  />
                </Field>
              </>
            )}
          </div>

          {/* ── Feedback messages ───────────────────────────────── */}
          {successMsg && (
            <p className="pf-feedback pf-feedback--success" role="status">
              {successMsg}
            </p>
          )}
          {saveError && (
            <p className="pf-feedback pf-feedback--error" role="alert">
              {saveError}
            </p>
          )}

          {/* ── Actions ─────────────────────────────────────────── */}
          {editMode && (
            <div className="pf-actions">
              <button
                type="button"
                className="pf-btn pf-btn--ghost"
                onClick={handleCancel}
                disabled={isBusy}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="pf-btn pf-btn--primary"
                disabled={isBusy}
              >
                {isBusy ? "Guardando…" : "Guardar cambios"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
