import React from "react";
import { useNavigate } from "react-router-dom";

// Component receives the function to update the user category in App.jsx
function AgeGatePage({ onSetAgeCategory }) {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    // 1. Tell the main app state whether the user is 'kid' or 'pro'
    onSetAgeCategory(category);

    // 2. Redirect to the correct dashboard based on the choice
    if (category === "kid") {
      navigate("/kid-dashboard");
    } else {
      navigate("/pro-dashboard");
    }
  };

  return (
    // Tailwind Classes are used here for the "nice UI" (flex, bg-white, shadow-2xl)
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome! What is your age group?
        </h2>

        <p className="text-gray-600 mb-8">
          Your choice determines the look and level of the exam content.
        </p>

        <div className="flex justify-between space-x-4">
          {/* Button for Kid UI */}
          <button
            className="w-1/2 py-4 px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-150 shadow-md"
            onClick={() => handleCategorySelect("kid")}
          >
            Below 14 (Kid's Zone 🚀)
          </button>

          {/* Button for Pro UI */}
          <button
            className="w-1/2 py-4 px-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-150 shadow-md"
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
