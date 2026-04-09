import { useState, type ChangeEvent } from 'react'
import './App.css'
import type { IDatosUsuarios } from './Interface/DatosUsuario';

export function Render({ usuario, esPremium, onActivar }: IDatosUsuarios) {
  // const [editando, setEditando] = useState(false);
  const [apodo, setApodo] = useState("");

  const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
    setApodo(e.target.value);
  }

  return (
    <>
      <div>
        <h1>{usuario.nombre}</h1>
        {esPremium ? <span>VIP</span> : <button onClick={onActivar}>Activar Premium</button>}
        <input value={apodo} onChange={manejarCambio} />
      </div>
    </>
  )
}