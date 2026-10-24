import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import './AdminLoginPage.css';

/**
 * IMPORTANT: This is a FRONTEND PROTOTYPE ONLY.
 * There is NO real authentication here. This login form does not protect
 * any real data or backend. Do NOT use this in production.
 * Backend authentication and server-side authorization must be implemented
 * via Flask before any admin functionality goes live.
 */

const DEMO_CREDENTIALS = { username: 'admin', password: 'demo1234' };

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Admin Login — Perfect Fit Factory';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (form.username === DEMO_CREDENTIALS.username && form.password === DEMO_CREDENTIALS.password) {
      sessionStorage.setItem('pff_admin_demo', '1');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Try admin / demo1234');
    }
    setLoading(false);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/logo.jpg" alt="Perfect Fit Crest" className="admin-login-logo-img" />
          <span className="logo-main">Perfect Fit</span>
          <span className="logo-sub">DTF &amp; Custom Print · Admin</span>
        </div>

        {/* Demo warning */}
        <div className="admin-demo-warning" role="alert">
          <AlertTriangle size={16} />
          <div>
            <strong>Frontend Prototype Only</strong>
            <p>This admin interface is not secured. Do not use for real administration until backend authentication is implemented.</p>
          </div>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <h1 className="admin-login-title">Sign In</h1>

          <div className="form-group">
            <label htmlFor="al-username" className="form-label">Username</label>
            <input
              id="al-username"
              type="text"
              className="form-input"
              placeholder="admin"
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="al-password" className="form-label">Password</label>
            <div className="pw-wrap">
              <input
                id="al-password"
                type={showPw ? 'text' : 'password'}
                className="form-input"
                placeholder="demo1234"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
            <Lock size={16} />
            {loading ? 'Signing in…' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p className="admin-login-hint">
          Demo credentials: <code>admin</code> / <code>demo1234</code>
        </p>
      </div>
    </div>
  );
}
