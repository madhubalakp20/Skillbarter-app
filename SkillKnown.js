import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./SkillKnown.css";

function SkillKnown() {
  const [skillKnown, setSkillKnown] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!skillKnown.trim()) return alert("Please enter your skill!");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userId = Date.now(); // unique user id
    users.push({ id: userId, known: skillKnown, wanted: "" });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserId", userId);

    navigate("/skill-wanted");
  };

  return (
    <div className="skillknown-page">
      <Navbar />

      {/* Progress bar */}
      <div className="progress-bar">
        <span className="active">1. Your Skill</span>
        <span>2. Skill Wanted</span>
        <span>3. Find Partner</span>
        <span>4. Start Learning</span>
      </div>

      {/* Floating background icons */}
      <div className="floating-icons">
        <span>🎸</span>
        <span>💻</span>
        <span>🎨</span>
        <span>📘</span>
      </div>

      <div className="skillknown-container">
        <h1>🎨 What skill do you know? (You can teach)</h1>
        <form onSubmit={handleNext}>
          <input
            type="text"
            placeholder="E.g. Web Design"
            value={skillKnown}
            onChange={(e) => setSkillKnown(e.target.value)}
            required
          />
          <button type="submit">Next ➡</button>
        </form>
      </div>

      {/* Trending skills */}
      <div className="trending-skills">
        <h3>🔥 Trending Skills</h3>
        <p>Python 🐍 | Guitar 🎸 | Cooking 🍳 | Web Design 🎨</p>
      </div>

      {/* Motivational tips */}
      <div className="motivation">
        <p>💡 "Sharing your knowledge helps you grow faster!"</p>
      </div>
    </div>
  );
}

export default SkillKnown;
