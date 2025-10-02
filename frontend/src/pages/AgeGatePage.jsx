import React from "react";
import { useNavigate } from "react-router-dom";
import "./AgeGatePage.css"; // Import the CSS file

function AgeGatePage({ onSetAgeCategory }) {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    onSetAgeCategory(category);
    navigate(category === "kid" ? "/kid-dashboard" : "/pro-dashboard");
  };

  return (
    <div className="agegate-container">
      <div className="agegate-card">
        <h2>Welcome! What is your age group?</h2>
        <p>Your choice determines the look and level of the exam content.</p>

        <div className="agegate-buttons">
          <button
            className="agegate-btn kid"
            onClick={() => handleCategorySelect("kid")}
          >
            Below 14 (Kid's Zone 🚀)
          </button>

          <button
            className="agegate-btn pro"
            onClick={() => handleCategorySelect("pro")}
          >
            Above 14 (Professional 🎓)
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgeGatePage;
