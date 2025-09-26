import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./SkillWanted.css";

function SkillWanted() {
  const [skillWanted, setSkillWanted] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (!skillWanted.trim()) return alert("Please enter the skill you want to learn!");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserId = localStorage.getItem("currentUserId");

    // Update current user's wanted skill
    const updatedUsers = users.map((u) =>
      u.id == currentUserId ? { ...u, wanted: skillWanted } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Find a partner
    const currentUser = updatedUsers.find((u) => u.id == currentUserId);
    const partner = updatedUsers.find(
      (u) =>
        u.id != currentUserId &&
        u.known === currentUser.wanted &&
        u.wanted === currentUser.known
    );

    if (partner) {
      localStorage.setItem("matchedPartnerId", partner.id);
      alert("🎉 Perfect Match Found! You can start learning!");
    } else {
      localStorage.removeItem("matchedPartnerId");
      alert("No perfect match yet, but you can still start learning!");
    }

    navigate("/learning");
  };

  return (
    <div className="skillwanted-page">
      <Navbar />

      {/* Progress bar */}
      <div className="progress-bar">
        <span className="done">1. Your Skill</span>
        <span className="active">2. Skill Wanted</span>
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

      <div className="skillwanted-container">
        <h1>🎯 What skill do you want to learn?</h1>
        <form onSubmit={handleNext}>
          <input
            type="text"
            placeholder="E.g. Guitar"
            value={skillWanted}
            onChange={(e) => setSkillWanted(e.target.value)}
            required
          />
          <button type="submit">Check Match & Continue ➡</button>
        </form>
      </div>

      {/* Trending skills */}
      <div className="trending-skills">
        <h3>🌟 Popular Skills</h3>
        <p>Photography 📸 | Cooking 🍳 | Python 🐍 | Graphic Design 🎨</p>
      </div>

      {/* Motivational tips */}
      <div className="motivation">
        <p>🚀 "Every expert was once a beginner."</p>
      </div>
    </div>
  );
}

export default SkillWanted;
