import { useState, useCallback } from "react";
import { conexionBD } from "../services/ConexionBD";

const BUCKET = "avatars";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

export function usePhotoUpload(initialPreview = null) {
  const [preview, setPreview] = useState(initialPreview);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  /**
   * Call when the user selects a file via <input type="file">.
   * Sets an immediate local preview via object URL.
   * Returns an error string if the file is invalid, or null if OK.
   */
  const handleFileSelect = useCallback(
    (selectedFile) => {
      if (!selectedFile) return null;

      if (!ALLOWED_TYPES.includes(selectedFile.type)) {
        return "Solo se permiten imágenes JPG, PNG, WebP o GIF";
      }
      if (selectedFile.size > MAX_SIZE_MB * 1024 * 1024) {
        return `La imagen no puede superar ${MAX_SIZE_MB} MB`;
      }

      // Revoke previous object URL to avoid memory leaks
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }

      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      setFile(selectedFile);
      setUploadError(null);
      return null;
    },
    [preview],
  );

  /**
   * Uploads the selected file to Supabase Storage.
   * @param {string} userDocument — used to name the file uniquely
   * @returns {string|null} public URL on success, null on failure
   */
  const uploadPhoto = useCallback(
    async (userDocument) => {
      if (!file) return null;

      setUploading(true);
      setUploadError(null);

      try {
        const ext = file.name.split(".").pop().toLowerCase();
        const path = `${userDocument}/${Date.now()}.${ext}`;

        const { error: storageError } = await conexionBD.storage
          .from(BUCKET)
          .upload(path, file, { upsert: true, contentType: file.type });

        if (storageError) throw storageError;

        const { data } = conexionBD.storage.from(BUCKET).getPublicUrl(path);
        return data.publicUrl;
      } catch (err) {
        setUploadError(err.message ?? "Error al subir la imagen");
        return null;
      } finally {
        setUploading(false);
      }
    },
    [file],
  );

  return {
    preview,
    setPreview,
    file,
    uploading,
    uploadError,
    handleFileSelect,
    uploadPhoto,
  };
}
