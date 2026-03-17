import "./Semaforo.css";
import { useState } from "react";

function Semaforo() {
  const [semaforo, setSemaforo] = useState(false);
  return (
    <>
      <div className="semafore">
        <h1>Semáforo</h1>
        <p>Este es un semáforo simple.</p>
        <div className={`luz ${!semaforo ? "rojo" : null}`}></div>
        <div className={`luz ${semaforo ? "verde" : null}`}></div>
        <input
          type="button"
          value="Cambiar semáforo"
          onClick={() => setSemaforo(!semaforo)}
        />
      </div>
    </>
  );
}

export default Semaforo;
