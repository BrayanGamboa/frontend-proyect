import "./SelectField.css";

function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className="selectField">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange} className="selectFiltros">
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
