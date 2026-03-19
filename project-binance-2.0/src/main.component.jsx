import { useState } from "react";
import "./main.component.css";
import Counter from "./components/Counter";

function MainComponent() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <main>
      <div className="mainHeader">
        <div>
          <h2>Contenido Principal</h2>
          <p className="subtitle">
            Aquí se mostrará el contenido principal de la página, como gráficos,
            tablas o cualquier otra información relevante.
          </p>
        </div>

        <button
          className="toggleButton"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          {showDetails ? "Ocultar detalles" : "Mostrar detalles"}
        </button>
      </div>

      {showDetails && (
        <section className="details">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi natus
            alias, neque, deleniti molestias inventore labore blanditiis, animi
            vero et omnis? Libero, reiciendis assumenda inventore modi delectus
            nesciunt ut tempore?
          </p>
        </section>
      )}

      <Counter />
    </main>
  );
}

export default MainComponent;
