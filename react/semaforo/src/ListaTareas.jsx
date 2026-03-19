import "./ListaTareas.css";
import { useState } from "react";
import "./CrudTarea"
import CrudTarea from "./CrudTarea";

function ListaTareas() {
  return (
    <>
      <div className="lista-tareas">
        <h1>Lista de Tareas</h1>
        <p>Agrega tus tareas pendientes a la lista.</p>
        <CrudTarea />
      </div>
    </>
  );
}

export default ListaTareas;
