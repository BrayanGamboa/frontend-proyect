import "./aside.css";

function Aside() {
  return (
    <>
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

        <label>Fecha de inicio:</label>
        <input type="date" className="selectFiltros" />

        <label>Fecha de fin:</label>
        <input type="date" className="selectFiltros" />

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1280px-Binance_Logo.svg.png"
          alt="Imagen de Binance"
        />
      </aside>
    </>
  );
}

export default Aside;
