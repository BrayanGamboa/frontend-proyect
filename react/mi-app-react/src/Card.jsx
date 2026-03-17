import "./Card.css";

function Card({text, key}) {
  return (
    <>
      <div className="card">
        <p key={key}>{text}</p>
      </div>
    </>
  );
}

export default Card;
