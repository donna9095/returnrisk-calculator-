import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [signingIn, setSigningIn] = useState(false);

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = 'Enter your email.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!password) {
      next.password = 'Enter your password.';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No real backend here — this simulates a brief sign-in request, then
    // routes to the shopper experience. Swap the setTimeout for a real
    // fetch('/login', { method: 'POST', body: ... }) call when the API exists.
    setSigningIn(true);
    setTimeout(() => {
      navigate('/shopper');
    }, 600);
  }

  return (
    <div className="login">
      <div className="login__mark">ReturnLess</div>
      <h1 className="login__headline">Know a return is coming before it ships back.</h1>
      <p className="login__subhead">
        Sign in to check return risk before you buy, or jump straight into a persona view below.
      </p>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <div className="login__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="login__field-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="login__field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span id="password-error" className="login__field-error">
              {errors.password}
            </span>
          )}
        </div>

        <button type="submit" className="login__submit" disabled={signingIn}>
          {signingIn ? 'Signing in…' : 'Log in'}
        </button>
      </form>

      <div className="login__divider">
        <span>or jump straight to a view</span>
      </div>

      <div className="login__options">
        <button className="login__option login__option--shopper" onClick={() => navigate('/shopper')}>
          <span className="login__option-label">Shopper</span>
          <span className="login__option-desc">Browse products and check fit risk before buying</span>
        </button>

        <button className="login__option login__option--seller" onClick={() => navigate('/seller')}>
          <span className="login__option-label">Seller</span>
          <span className="login__option-desc">Track return rates and spot high-risk orders</span>
        </button>

        <button className="login__option login__option--admin" onClick={() => navigate('/admin')}>
          <span className="login__option-label">Admin</span>
          <span className="login__option-desc">Monitor the platform and the prediction model</span>
        </button>
      </div>
    </div>
  );
}
