import type { IUsuario } from "./Usuario";

export interface IDatosUsuarios {
  usuario: IUsuario;
  esPremium: boolean;
  onActivar: () => void
}