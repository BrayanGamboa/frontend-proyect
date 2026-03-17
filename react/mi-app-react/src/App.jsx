import "./App.css";

function App() {
  return (
    <>
      <div className="contenedor">
        <header>
          <h1 id="tltPrincipal">Binance 2.0 - Dashboard</h1>
          <nav>
            <p>Esta es la barra/menú de navegación</p>
          </nav>
        </header>
      </div>
      <div className="contenido">
        <aside>
          <label>Año en el que deseas ver los datos:</label>
          <select className="selectFiltros">
            <option value="2026" selected>
              2026
            </option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
          <hr />
          <label>División por periodos:</label>
          <select className="selectFiltros">
            <option value="D" selected>
              Día
            </option>
            <option value="S">Semana</option>
            <option value="M">Mes</option>
            <option value="T">Trimestre</option>
            <option value="A">Año</option>
          </select>
          <hr />

          <label>Fecha de inicio:</label>
          <input type="date" className="selectFiltros" />

          <label>Fecha de fin:</label>
          <input type="date" className="selectFiltros" />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1280px-Binance_Logo.svg.png"
            alt="Imagen de Binance"
          />
        </aside>

        <main>
          <h2>Contenido Principal</h2>
          <p>
            Aquí se mostrará el contenido principal de la página, como gráficos,
            tablas o cualquier otra información relevante.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi natus
            alias, neque, deleniti molestias inventore labore blanditiis, animi
            vero et omnis? Libero, reiciendis assumenda inventore modi delectus
            nesciunt ut tempore?
          </p>
        </main>
      </div>

      <footer>
        <p>Derechos de autor © 2026 Binance. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

export default App;
