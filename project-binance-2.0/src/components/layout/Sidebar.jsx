import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { to: "/dashboard", icon: "▦", label: "Dashboard" },
  { to: "/market", icon: "◈", label: "Mercado" },
  { to: "/profile", icon: "◉", label: "Perfil" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav" aria-label="Menú lateral">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className="sidebar__link">
            <span className="sidebar__icon" aria-hidden="true">
              {icon}
            </span>
            <span className="sidebar__label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__version">v2.0</p>
      </div>
    </aside>
  );
}
