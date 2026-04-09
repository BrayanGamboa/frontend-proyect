import './header.css'
import { NavLink} from "react-router-dom";

function Header() {
  return (
    <>
      <header className="appHeader">
        <div className="brand">
          <h1>Binance 2.0</h1>
          <span className="tagline">Dashboard</span>
        </div>
        <nav className="mainNav">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/datos">Datos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </nav>
      </header>
    </>
  );
}

export default Header

