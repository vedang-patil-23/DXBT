import React, { useState } from 'react';

const ALLOWED_USERNAME = 'Travel25';
const ALLOWED_PASSWORDS = ['Wh@tever1tt@ke$', 'D!ew1th@$mile'];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username.trim() === ALLOWED_USERNAME &&
      ALLOWED_PASSWORDS.includes(password)
    ) {
      setError('');
      onLogin();
    } else {
      setError('Invalid credentials.');
    }
  };


  return (
    <div className="dxbt-login-outer">
      <div className="dxbt-branding">
        <span className="dxbt-logo" style={{ fontFamily: 'Arsenica, Playfair Display, serif' }}>DXBT</span>
        <span className="dxbt-tagline">Dubai Travel Expense Manager</span>
      </div>
      <div className="dxbt-login-container">
        <form className="dxbt-login-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <div className="dxbt-login-error">{error}</div>}
        </form>
      </div>
    </div>
  );
}

