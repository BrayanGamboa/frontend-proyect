import "./Card.css";
import { useState } from "react";
import Alerta from "./Alerta";

const frases = [
  { id: 1, producto: "Manzana", precio: 3000 },
  { id: 2, producto: "Plátano", precio: 2500 },
  { id: 3, producto: "Naranja", precio: 2000 },
  { id: 4, producto: "Uva", precio: 4000 },
  { id: 5, producto: "Sandía", precio: 5000 },
];

function Card() {
  const [pagado, setPagado] = useState(false);
  return (
    <>
      <div className="card">
        <h1>Carrito de compras</h1>
        <p>This is a simple card component.</p>
        <ul>
          {frases.map((item) => (
            <li key={item.id}>
              {item.producto}: ${item.precio}
            </li>
          ))}
        </ul>
        <input
          type="button"
          value="Pagar ahora"
          onClick={() => setPagado(!pagado)}
        />

        {pagado ? <Alerta /> : null}
      </div>
    </>
  );
}

export default Card;
