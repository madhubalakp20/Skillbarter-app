import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const currentUserId = localStorage.getItem("currentUserId");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Demo users if none
  useEffect(() => {
    if (!users.length) {
      const demoUsers = [
        { id: "1", known: "Guitar", wanted: "Cooking" },
        { id: "2", known: "Web Design", wanted: "Photography" },
        { id: "3", known: "Cooking", wanted: "Guitar" },
        { id: "4", known: "Photography", wanted: "Python" },
        { id: "5", known: "Python", wanted: "Web Design" },
      ];
      users = demoUsers;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const currentUser = users.find(u => u.id === currentUserId) || {
    id: "0",
    known: "Guitar",
    wanted: "Web Design",
  };

  // Requests: who wants my skill
  const requests = users.filter(u => u.wanted === currentUser.known && u.id !== currentUserId);

  // Load counts from localStorage
  const initialAddedCount = parseInt(localStorage.getItem("addedKnowledgeCount")) || 0;
  const initialSharedCount = parseInt(localStorage.getItem("sharedKnowledgeCount")) || 0;

  const [addedCount, setAddedCount] = useState(initialAddedCount);
  const [sharedCount, setSharedCount] = useState(initialSharedCount);
  const [sharedUsers, setSharedUsers] = useState({});

  // Simulate adding knowledge
  const addKnowledge = () => {
    const newCount = addedCount + 1;
    setAddedCount(newCount);
    localStorage.setItem("addedKnowledgeCount", newCount);
    alert("Your knowledge has been added! ✅");
  };

  const shareKnowledge = (userId) => {
    alert("Your knowledge has been shared with this user! It will be helpful for them.");
    setSharedUsers(prev => ({ ...prev, [userId]: true }));
    const newCount = sharedCount + 1;
    setSharedCount(newCount);
    localStorage.setItem("sharedKnowledgeCount", newCount);
    // Navigate to feedback page
    window.location.href = "/feedback";
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-container">
        <h1>📊 SkillBarter Dashboard</h1>

        {/* Cards */}
        <div className="cards-container">
          <div className="dashboard-card">
            <h2>Knowledge Added</h2>
            <p className="card-count">{addedCount}</p>
            <button onClick={addKnowledge}>Add Knowledge</button>
          </div>

          <div className="dashboard-card">
            <h2>Knowledge Shared</h2>
            <p className="card-count">{sharedCount}</p>
            <p>Click below to share knowledge with others</p>
          </div>
        </div>

        {/* Requests */}
        <div className="requests-list">
          <h2>Requests for Your Skill "{currentUser.known}"</h2>
          {requests.length ? (
            requests.map(r => (
              <div key={r.id} className="request-card">
                <span>{r.id} wants to learn <strong>{currentUser.known}</strong></span>
                {!sharedUsers[r.id] ? (
                  <button onClick={() => shareKnowledge(r.id)}>Share Knowledge</button>
                ) : (
                  <span style={{ color: "green", fontWeight: "600" }}>Shared ✅</span>
                )}
              </div>
            ))
          ) : (
            <p>No requests yet. Add or share your skill to help others!</p>
          )}
        </div>
      </div>
    </div>
  );
}
