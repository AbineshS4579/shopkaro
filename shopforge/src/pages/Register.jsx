import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Auth.css';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Basic validation
    if (!form.name.trim()) return setLocalError('Name is required');
    if (!form.email.includes('@')) return setLocalError('Enter a valid email');
    if (form.password.length < 6) return setLocalError('Password must be at least 6 characters');
    if (form.password !== form.confirm) return setLocalError('Passwords do not match');

    const result = await register(form.name, form.email, form.password);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <main className="auth-page page-enter">
      <div className="auth-box">
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <span className="logo-mark">⬡</span>
          <span className="logo-text">ShopForge</span>
        </Link>

        <h1 className="auth-title">Create your account</h1>
        <p className="auth-sub">Join thousands of happy shoppers</p>

        {/* Success message */}
        {success && (
          <div className="auth-alert success">
            ✅ Account created! Redirecting to login…
          </div>
        )}

        {/* Error message */}
        {(localError || error) && (
          <div className="auth-alert error">
            ⚠️ {localError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="field-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ravi Kumar"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div className="field-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ravi@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="field-group">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
