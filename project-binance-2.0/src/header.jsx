import './header.css'

function Header() {
  return (
    <header className="appHeader">
      <div className="brand">
        <h1>Binance 2.0</h1>
        <span className="tagline">Dashboard</span>
      </div>
      <nav className="mainNav">
        <a href="#home">Inicio</a>
        <a href="#datos">Datos</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

export default Header

