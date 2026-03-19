import { useState } from "react";
import "./Counter.css";

function Counter({ initial = 0, step = 1 }) {
  const [count, setCount] = useState(initial);

  return (
    <section className="counterCard">
      <h3>Contador interactivo</h3>
      <p className="counterValue">{count}</p>
      <div className="counterButtons">
        <button onClick={() => setCount((prev) => prev - step)} aria-label="Disminuir">
          -
        </button>
        <button onClick={() => setCount((prev) => prev + step)} aria-label="Aumentar">
          +
        </button>
        <button className="secondary" onClick={() => setCount(initial)} aria-label="Reiniciar">
          Reiniciar
        </button>
      </div>
    </section>
  );
}

export default Counter;
