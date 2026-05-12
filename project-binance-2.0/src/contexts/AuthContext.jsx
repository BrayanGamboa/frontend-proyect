import { createContext, useContext, useState, useCallback } from 'react';

/* ─── Mock credentials ────────────────────────────────────────── */
const MOCK_CREDENTIALS = { username: 'admin', password: 'admin123' };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ct_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback((username, password) => {
    if (
      username === MOCK_CREDENTIALS.username &&
      password === MOCK_CREDENTIALS.password
    ) {
      const userData = { username, role: 'user' };
      setUser(userData);
      localStorage.setItem('ct_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Credenciales incorrectas' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ct_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
