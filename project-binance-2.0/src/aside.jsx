import { useState } from "react";
import "./aside.css";
import SelectField from "./components/SelectField";

const yearOptions = [
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
  { value: "2022", label: "2022" },
  { value: "2021", label: "2021" },
  { value: "2020", label: "2020" },
];

const periodOptions = [
  { value: "D", label: "Día" },
  { value: "S", label: "Semana" },
  { value: "M", label: "Mes" },
  { value: "T", label: "Trimestre" },
  { value: "A", label: "Año" },
];

function Aside() {
  const [year, setYear] = useState("2026");
  const [period, setPeriod] = useState("D");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const periodLabel = periodOptions.find((item) => item.value === period)?.label || "Día";

  return (
    <aside>
      <div className="asideHeader">
        <h2>Filtros</h2>
        <button className="toggleButton" onClick={() => setShowFilters((prev) => !prev)}>
          {showFilters ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {showFilters && (
        <>
          <div className="fieldGroup">

            <SelectField
              id="year"
              label="Año"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              options={yearOptions}
            />
            <SelectField
              id="period"
              label="División por periodos"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              options={periodOptions}
            />
            <label htmlFor="startDate">Fecha de inicio:</label>
            <input
              id="startDate"
              type="date"
              className="selectFiltros"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">Fecha de fin:</label>
            <input
              id="endDate"
              type="date"
              className="selectFiltros"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="filterSummary">
        <p>
          Mostrando datos de <strong>{periodLabel}</strong> para <strong>{year}</strong>
          {startDate && endDate ? ` desde ${startDate} hasta ${endDate}` : ""}
        </p>
      </div>

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Binance_Logo.svg/1280px-Binance_Logo.svg.png"
        alt="Imagen de Binance"
      />
    </aside>
  );
}

export default Aside;
