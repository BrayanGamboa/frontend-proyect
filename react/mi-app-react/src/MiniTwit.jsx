import "./MiniTwit.css";
import { useState } from "react";
import Card from "./Card.jsx";

function MiniTwit() {
  const [text, setText] = useState("");
  const [feeds, setFeeds] = useState([]);

  const esValido =
    text.length > 0 && text.length <= 280;
  return (
    <>
      <div className="card-post">
        <h1>MiniTwit</h1>
        <div className="card-body">
          <textarea
            name="textPublication"
            id="textPublication"
            placeholder="Escribe aquí tu post"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <input
            type="button"
            value="Enviar"
            disabled={!esValido}
            onClick={() => setFeeds([text, ...feeds])}
          />
        </div>
      </div>
      <div className="comments-section">
        {feeds.map((feed, index) => (
          <Card text={feed} key={index} />
        ))}
      </div>
    </>
  );
}

// function limpiarTexto(texto) {
//   return texto.trim();
// }

export default MiniTwit;
