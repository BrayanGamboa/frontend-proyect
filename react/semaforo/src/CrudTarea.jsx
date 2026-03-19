import "./CrudTarea.css";
import { useState } from "react";

function CrudTarea() {
  const [tareas, setTareas] = useState([]);
  return (
    <>
      <div className="card-tarea">
        <div className="filters">
          <label htmlFor="filtro">Filtrar por:</label>
          <select name="filtro" id="filtro">
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        <div className="tarea">
          <form
            action=""
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
              {
                tareas.length < 6 &&
                  setTareas([
                    ...tareas,
                    {
                      texto: document.getElementById("texto-tarea").value,
                      category:
                        document.getElementById("categoria-tarea").value,
                    },
                  ]);
              }
            }}
          >
            <input
              type="text"
              name="texto"
              id="texto-tarea"
              placeholder="¿Qué deseas hacer?"
              className="button"
              required
            />
            <select name="categories" id="categoria-tarea" className="button">
              <option value="hobby" selected>
                Hobby
              </option>
              <option value="trabajo">Trabajo</option>
              <option value="personal">Personal</option>
            </select>

            <button className="button" type="submit">
              Agregar
            </button>
          </form>
        </div>

        <div className="tareas-lista">
          {tareas.length === 5 && (
            <>
              <div className="alerta">
                <h4>¡Objetivo logrado!</h4>
                <p>Demostraste dominar las bases de React</p>
              </div>
            </>
          )}

          <ul>
            {tareas.map((tarea, index) => (
              <li key={index}>
                {tarea.texto}{" "}
                <span className="card-category">{tarea.category}</span>
                <span
                  className=" card-category delete"
                  onClick={() =>
                    setTareas(tareas.filter((_, i) => i !== index))
                  }
                >
                  Eliminar
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CrudTarea;
