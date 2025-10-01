import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// 1. Import all custom page components, including the new AgeGatePage
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AgeGatePage from "./pages/AgeGatePage.jsx"; // <--- NEW IMPORT

// --- PLACEHOLDER COMPONENTS (Only those not yet built) ---
// The AgeGatePage function has been removed because it is now imported.

function ProDashboard() {
  return <h1>Professional Student Dashboard (Pro UI)</h1>;
}

function KidDashboard() {
  return <h1>Kid's Fun Learning Zone (Kid UI)</h1>;
}
// -----------------------------------------------------------

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAgeCategory, setUserAgeCategory] = useState(null);

  return (
    <div className="App">
      <Routes>
        {/* 1. Public Routes: Signup and Login */}
        <Route
          path="/signup"
          element={<SignupPage onSignupSuccess={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={setIsLoggedIn} />}
        />

        {/* 2. Initial Redirect: Send users to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 3. Protected Route: Age Gate (Requires Login) */}
        <Route
          path="/age-gate"
          element={
            isLoggedIn ? (
              // This now renders the fully functional, styled component
              <AgeGatePage onSetAgeCategory={setUserAgeCategory} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 4. Category Routes (Requires Age Check) */}
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

        {/* 5. Catch-all */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
