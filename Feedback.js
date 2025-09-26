import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './Feedback.css';

export default function Feedback() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please give a rating!");
      return;
    }
    setSubmitted(true);
    setText('');
    setRating(0);
    setHover(0);
  };

  return (
    <>
      <Navbar />
      <main className="feedback-page">
        {/* Floating gradient blobs */}
        <div className="floating-blob blob1"></div>
        <div className="floating-blob blob2"></div>
        <div className="floating-blob blob3"></div>

        <div className="feedback-card">
          {!submitted ? (
            <>
              <h1>💬 We Value Your Feedback</h1>
              <p className="sub-text">Help us improve by rating and sharing your thoughts</p>

              {/* Star Rating */}
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={`star-btn ${starValue <= (hover || rating) ? "on" : "off"}`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                    >
                      &#9733;
                    </button>
                  );
                })}
              </div>

              {/* Emoji quick feedback */}
              <div className="emoji-row">
                <span role="img" aria-label="excited">🎉</span>
                <span role="img" aria-label="love">😍</span>
                <span role="img" aria-label="neutral">😐</span>
                <span role="img" aria-label="sad">😢</span>
              </div>

              <form onSubmit={submit}>
                <textarea
                  placeholder="Your feedback..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="submit-btn">Submit Feedback</button>
              </form>
            </>
          ) : (
            <div className="thanks">
              <h2>🎉 Thank You!</h2>
              <p>Your feedback helps us grow 🚀</p>
              <div className="confetti">✨ 🎊 🎉 ✨</div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
