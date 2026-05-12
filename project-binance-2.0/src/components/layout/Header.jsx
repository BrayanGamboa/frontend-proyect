import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import './Header.css';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      {/* Brand */}
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">₿</span>
        <span className="header__name">CryptoTrack</span>
      </div>

      {/* Nav */}
      <nav className="header__nav" aria-label="Navegación principal">
        <NavLink to="/dashboard" className="header__link">Dashboard</NavLink>
        <NavLink to="/market"    className="header__link">Mercado</NavLink>
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <ThemeToggle />
        <div className="header__user">
          <span className="header__username">{user?.username}</span>
          <button className="header__logout btn-ghost" onClick={logout}>
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
