import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';
import logo from '../assets/logo.png';

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="hero-text">
          <div className="logo-container">
            <img src={logo} alt="SkillBarter Logo" className="logo-img" />
            <h1 className="animate-title">SkillBarter</h1>
          </div>
          <p className="animate-subtitle">Exchange your skills with others without money!</p>
          <div className="home-buttons">
            <Link to="/login" className="btn btn-login">Login</Link>
          </div>
        </div>

        <div className="hero-animation">
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
          <div className="blob blob3"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
