import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeRole, setActiveRole] = useState('shopper');
  const [idInput, setIdInput] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  function handleRoleTab(role) {
    setActiveRole(role);
    setLoginError('');
    setErrors({});
  }

  function handleQuickFill(role) {
    const creds = DEMO_USERS[role];
    if (creds) {
      setActiveRole(role);
      setIdInput(creds.id);
      setPassword(creds.password);
      setLoginError('');
      setErrors({});
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoginError('');
    const newErrors = {};

    if (!idInput.trim()) {
      newErrors.id = 'Please enter your User ID or Email.';
    }
    if (!password) {
      newErrors.password = 'Please enter your password.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSigningIn(true);

    setTimeout(() => {
      const result = login(idInput, password, activeRole);
      setSigningIn(false);

      if (!result.success) {
        setLoginError(result.error || 'Authentication failed. Please check credentials.');
        return;
      }

      // Route to appropriate dashboard based on authenticated role
      const dest = result.user.role === 'admin'
        ? '/admin'
        : result.user.role === 'seller'
        ? '/seller'
        : '/shopper';

      navigate(dest);
    }, 400);
  }

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__mark">ReturnLess</div>
        <h1 className="login__headline">Pre-Dispatch E-Commerce Return Defense</h1>
        <p className="login__subhead">
          Secure Role-Based Portal. Sign in with your ID and password to access your role dashboard.
        </p>
      </div>

      <div className="login__card">
        {/* Role Selector Tabs */}
        <div className="login__role-tabs">
          <button
            type="button"
            className={`login__role-tab ${activeRole === 'shopper' ? 'active shopper' : ''}`}
            onClick={() => handleRoleTab('shopper')}
          >
            🛍️ Shopper
          </button>
          <button
            type="button"
            className={`login__role-tab ${activeRole === 'seller' ? 'active seller' : ''}`}
            onClick={() => handleRoleTab('seller')}
          >
            🏪 Seller
          </button>
          <button
            type="button"
            className={`login__role-tab ${activeRole === 'admin' ? 'active admin' : ''}`}
            onClick={() => handleRoleTab('admin')}
          >
            🛡️ Admin
          </button>
        </div>

        {loginError && (
          <div className="login__alert-error">
            ⚠️ {loginError}
          </div>
        )}

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          <div className="login__field">
            <label htmlFor="idInput">
              {activeRole === 'seller' ? 'Seller ID / Email' : activeRole === 'admin' ? 'Admin ID / Email' : 'Shopper ID / Email'}
            </label>
            <input
              id="idInput"
              type="text"
              value={idInput}
              onChange={(e) => {
                setIdInput(e.target.value);
                setLoginError('');
              }}
              placeholder={
                activeRole === 'seller'
                  ? 'e.g. seller or seller@returnless.com'
                  : activeRole === 'admin'
                  ? 'e.g. admin or admin@returnless.com'
                  : 'e.g. shopper or shopper@returnless.com'
              }
              aria-invalid={Boolean(errors.id)}
            />
            {errors.id && <span className="login__field-error">{errors.id}</span>}
          </div>

          <div className="login__field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '11px', cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && <span className="login__field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="login__submit" disabled={signingIn}>
            {signingIn ? 'Verifying Credentials…' : `Log in as ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`}
          </button>
        </form>

        {/* Demo Credentials Helper */}
        <div className="login__demo-box">
          <div className="login__demo-title">🔑 Demonstration Credentials:</div>
          <div className="login__demo-items">
            <div className="login__demo-item">
              <div>
                <strong>Shopper:</strong> <code>shopper</code> / <code>password123</code>
              </div>
              <button
                type="button"
                className="login__quick-fill-btn"
                onClick={() => handleQuickFill('shopper')}
              >
                Auto Fill
              </button>
            </div>
            <div className="login__demo-item">
              <div>
                <strong>Seller:</strong> <code>seller</code> / <code>password123</code>
              </div>
              <button
                type="button"
                className="login__quick-fill-btn"
                onClick={() => handleQuickFill('seller')}
              >
                Auto Fill
              </button>
            </div>
            <div className="login__demo-item">
              <div>
                <strong>Admin:</strong> <code>admin</code> / <code>password123</code>
              </div>
              <button
                type="button"
                className="login__quick-fill-btn"
                onClick={() => handleQuickFill('admin')}
              >
                Auto Fill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
