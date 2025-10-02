import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Pages
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AgeGatePage from "./pages/AgeGatePage.jsx";

// Dashboards
function ProDashboard() {
  return <h1>Professional Student Dashboard (Pro UI)</h1>;
}

function KidDashboard() {
  return <h1>Kid's Fun Learning Zone (Kid UI)</h1>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAgeCategory, setUserAgeCategory] = useState(null);

  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/signup"
          element={<SignupPage onSignupSuccess={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={setIsLoggedIn} />}
        />

        {/* Initial Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Age Gate */}
        <Route
          path="/age-gate"
          element={
            isLoggedIn ? (
              <AgeGatePage onSetAgeCategory={setUserAgeCategory} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Protected Dashboards */}
        <Route
          path="/pro-dashboard"
          element={
            userAgeCategory === "pro" ? (
              <ProDashboard />
            ) : (
              <Navigate to="/age-gate" replace />
            )
          }
        />
        <Route
          path="/kid-dashboard"
          element={
            userAgeCategory === "kid" ? (
              <KidDashboard />
            ) : (
              <Navigate to="/age-gate" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
