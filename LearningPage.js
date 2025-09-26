import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./LearningPage.css";

function LearningPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [partners, setPartners] = useState([]);
  const [tips, setTips] = useState([]);
  const [myTips, setMyTips] = useState("");
  const navigate = useNavigate();

  const skillTips = {
    guitar: [
      "Practice basic chords daily for 15 minutes.",
      "Learn strumming patterns before songs.",
      "Start with easy songs to build confidence.",
    ],
    cooking: [
      "Always taste as you cook.",
      "Keep knives sharp for safety.",
      "Start with simple 3-ingredient recipes.",
    ],
    painting: [
      "Experiment with colors, don’t fear mistakes.",
      "Practice brush strokes regularly.",
      "Start with small canvases to learn control.",
    ],
    coding: [
      "Break problems into small steps.",
      "Practice daily with mini-projects.",
      "Debugging is as important as writing code.",
    ],
    default: [
      "Stay consistent in practice.",
      "Ask for feedback from others.",
      "Break the skill into small, achievable parts.",
    ],
  };

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserId = localStorage.getItem("currentUserId");
    const me = users.find((u) => u.id == currentUserId);
    setCurrentUser(me);

    // Predefined random partners with IDs and skills
    const randomPartners = [
      { id: "P101", known: "Guitar", wanted: "Painting" },
      { id: "P202", known: "Cooking", wanted: "Coding" },
    ];
    setPartners(randomPartners);

    // Tips for wanted skill
    if (me && me.wanted) {
      const lowerSkill = me.wanted.toLowerCase();
      setTips(skillTips[lowerSkill] || skillTips.default);
    } else {
      setTips(skillTips.default);
    }
  }, []);

  const handleShare = () => {
    if (!myTips.trim()) {
      alert("Please write something to share!");
      return;
    }

    let sharedCount = parseInt(localStorage.getItem("sharedKnowledgeCount")) || 0;
    sharedCount += 1;
    localStorage.setItem("sharedKnowledgeCount", sharedCount);

    let sharedContent = JSON.parse(localStorage.getItem("sharedKnowledgeContent")) || [];
    sharedContent.push({ user: currentUser.name, skill: currentUser.known, notes: myTips });
    localStorage.setItem("sharedKnowledgeContent", JSON.stringify(sharedContent));

    alert(
      "✅ Your knowledge is shared with others! It will be very helpful for them."
    );

    setMyTips("");
    navigate("/feedback");
  };

  const handleConnect = (partner) => {
    alert(`You connected with ID: ${partner.id} to exchange skills!`);
  };

  return (
    <div className="learning-page">
      <Navbar />
      <div className="learning-container">
        {currentUser ? (
          <>
            <h1>📘 Welcome, {currentUser.name}!</h1>
            <p>
              You want to learn <b>{currentUser.wanted}</b> and you can teach{" "}
              <b>{currentUser.known}</b>.
            </p>

            {/* Learning Tips */}
            <div className="tips-section">
              <h2>💡 Learning Tips for {currentUser.wanted}</h2>
              <ul>
                {tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* Suggested Partners */}
            <div className="partners-section">
              <h2>🤝 Suggested Partners</h2>
              <div className="partner-cards">
                {partners.map((p) => (
                  <div key={p.id} className="partner-card">
                    <p><strong>ID:</strong> {p.id}</p>
                    <p><strong>Knows:</strong> {p.known}</p>
                    <p><strong>Wants:</strong> {p.wanted}</p>
                    <button onClick={() => handleConnect(p)}>Connect</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Teach Your Skill */}
            <div className="teach-section">
              <h2>📖 Teach Your Skill</h2>
              <p>
                Share your knowledge in <b>{currentUser.known}</b> with others
                who want to learn.
              </p>
              <textarea
                placeholder={`Write some quick tips or notes for ${currentUser.known}...`}
                value={myTips}
                onChange={(e) => setMyTips(e.target.value)}
              ></textarea>
              <button onClick={handleShare}>Share Knowledge</button>
            </div>
          </>
        ) : (
          <p>Loading your profile...</p>
        )}
      </div>
    </div>
  );
}

export default LearningPage;
