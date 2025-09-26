import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import skill1 from '../assets/skill1.png';
import skill2 from '../assets/skill2.png';
import skill3 from '../assets/skill3.png';
import skill4 from '../assets/skill4.png';
import skill5 from '../assets/skill5.png';
import skill6 from '../assets/skill6.png';

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleProtectedNav = (e, path) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login", { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("You have been logged out!");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="img-strip" aria-hidden>
          <img src={skill1} alt="" />
          <img src={skill2} alt="" />
          <img src={skill3} alt="" />
        </div>
        <div className="brand">
          <Link to="/">SkillBarter</Link>
        </div>
      </div>

      <nav className="nav-center">
        {/* Protected links */}
        <Link to="/skill-known" className="nav-link" onClick={(e) => handleProtectedNav(e, "/skill-known")}>Skill Known</Link>
        <Link to="/skill-wanted" className="nav-link" onClick={(e) => handleProtectedNav(e, "/skill-wanted")}>Skill Wanted</Link>
        <Link to="/learning" className="nav-link" onClick={(e) => handleProtectedNav(e, "/learning")}>Learning</Link>
        <Link to="/feedback" className="nav-link" onClick={(e) => handleProtectedNav(e, "/feedback")}>Feedback</Link>
        <Link to="/contact" className="nav-link" onClick={(e) => handleProtectedNav(e, "/contact")}>Contact</Link>

        {/* Public link */}
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </nav>

      <div className="nav-right">
        <div className="img-strip small" aria-hidden>
          <img src={skill4} alt="" />
          <img src={skill5} alt="" />
          <img src={skill6} alt="" />
        </div>
        <div className="navbar-buttons">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/signup" className="btn btn-signup">Sign Up</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}
