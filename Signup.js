import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Signup.css';
import logo from '../assets/logo.png';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setError("");
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      console.error(err);
      setError("⚠️ Cannot connect to server. Make sure backend is running.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        {/* Floating skill icons */}
        <div className="skill-icon sicon1">📚</div>
        <div className="skill-icon sicon2">🎯</div>
        <div className="skill-icon sicon3">🖥️</div>
        <div className="skill-icon sicon4">🎶</div>
        <div className="skill-icon sicon5">✍️</div>
        <div className="skill-icon sicon6">🎨</div>
        <div className="skill-icon sicon7">🤝</div>
        <div className="skill-icon sicon8">📱</div>

        <div className="signup-card">
          <img src={logo} alt="SkillBarter Logo" className="signup-logo" />
          <h2 className="signup-title">Create Account</h2>

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}

          <form onSubmit={handleSignup} className="signup-form">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="submit" className="btn-signup-page">Sign Up</button>
          </form>

          <p className="signup-login">
            Already have an account?{" "}
            <button type="button" className="link-btn" onClick={() => navigate('/login')}>Login</button>
          </p>

          <button className="btn-back" onClick={() => navigate('/')}>⬅ Back to Home</button>
        </div>
      </div>
    </>
  );
}

export default Signup;
