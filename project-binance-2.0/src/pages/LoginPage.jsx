import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in → go to dashboard
  if (isAuthenticated) {
    navigate('/dashboard', { replace: true });
  }

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // Small artificial delay so the spinner is visible
    await new Promise(r => setTimeout(r, 400));
    const result = login(form.username, form.password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-brand">
          <span className="login-logo" aria-hidden="true">₿</span>
          <h1 className="login-title">CryptoTrack</h1>
          <p className="login-subtitle">Accede a tu panel de mercado</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              className="field__input"
              placeholder="admin"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              className="field__input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="login-error" role="alert">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading || !form.username || !form.password}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        {/* Demo hint */}
        <p className="login-hint">
          Demo: <code>admin</code> / <code>admin123</code>
        </p>
      </div>
    </div>
  );
}
