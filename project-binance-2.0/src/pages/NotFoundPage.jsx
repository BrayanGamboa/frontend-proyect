import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1 className="not-found__title">Página no encontrada</h1>
      <p className="not-found__text">
        La ruta que buscas no existe o fue movida.
      </p>
      <Link to="/dashboard" className="not-found__btn">
        ← Volver al Dashboard
      </Link>
    </div>
  );
}
