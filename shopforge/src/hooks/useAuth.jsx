import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const API = 'https://shopforge-backend-1.onrender.com/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Load saved user from localStorage on page refresh
    const saved = localStorage.getItem('sf_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('sf_token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── REGISTER ────────────────────────────────────────────
  const register = async (name, email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ── LOGIN ────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      // Save to state and localStorage
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('sf_user', JSON.stringify(data.user));
      localStorage.setItem('sf_token', data.token);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ── LOGOUT ───────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sf_user');
    localStorage.removeItem('sf_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
