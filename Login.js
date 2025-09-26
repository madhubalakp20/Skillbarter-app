import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Login.css';
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ Save token to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");

      setError('');

      // Redirect to dashboard (or previous page)
      const redirectPath = location.state?.from || "/dashboard";
      navigate(redirectPath, { replace: true });

    } catch (err) {
      console.error(err);
      setError("⚠️ Cannot connect to server. Make sure backend is running.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        {/* Floating skill icons */}
        <div className="skill-icon icon1">💡</div>
        <div className="skill-icon icon2">🎸</div>
        <div className="skill-icon icon3">💻</div>
        <div className="skill-icon icon4">📘</div>

        <div className="login-card">
          <img src={logo} alt="SkillBarter Logo" className="logo-img" />
          <h2 className="login-title">Login</h2>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-login-page">
              Login
            </button>
          </form>

          <p className="login-signup">
            Don’t have an account?{" "}
            <button className="link-btn" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </p>
          <button className="btn-back" onClick={() => navigate('/')}>
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
