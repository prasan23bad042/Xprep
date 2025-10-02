import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
// 👈 ADD THIS LINE TO IMPORT YOUR NEW CSS FILE
import "./SignupPage.css";

function SignupPage({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignupSuccess(true);
      navigate("/age-gate");
    } catch (error) {
      console.error("Registration failed:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Sophisticated background patterns */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="signup-orb-1"></div>
        <div className="signup-orb-2"></div>

        {/* Subtle grid pattern */}
        <div className="signup-grid"></div>
      </div>

      {/* Floating accent elements - Kept inline for simplicity */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="signup-card-wrapper">
        {/* Main authentication card */}
        <div className="signup-card">
          {/* Header section */}
          <div className="text-center mb-10">
            {/* Brand icon */}
            <div className="signup-icon-box">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <svg
                className="signup-icon-svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>

            {/* Welcome text */}
            <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
              Join XPrep
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Create your account and start your journey
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="error-box">
              <div className="error-icon-wrapper">
                <svg
                  className="error-icon"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="error-title">Registration Error</h3>
                <p className="error-message">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Username field */}
            <div className="input-group">
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <div className="relative group">
                <div className="input-icon">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a unique username"
                  className="input-field"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <div className="relative group">
                <div className="input-icon">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="input-field"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="relative group">
                <div className="input-icon">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => {
                    const input = document.getElementById("password");
                    input.type =
                      input.type === "password" ? "text" : "password";
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Submit button */}
            <button type="submit" disabled={isLoading} className="btn-submit">
              {isLoading ? (
                <>
                  <svg
                    className="spinner h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Footer section */}
          <div className="mt-12 space-y-6">
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Sign in link */}
            <Link to="/login" className="btn-signin">
              <svg
                className="w-6 h-6 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Decorative elements - Kept inline for simplicity */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}

export default SignupPage;
