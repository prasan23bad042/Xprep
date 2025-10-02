import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(true);
      navigate("/age-gate");
    } catch (error) {
      console.error("Login failed:", error.code);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Invalid credentials. Check your email and password.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="main-container">
      <ul className="circles"></ul>
      <div className="card-container">
        <div className="header">
          <div className="brand-icon-container">
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1>Welcome Back</h1>
          <p>Sign in to your XPrep account</p>
        </div>

        {error && (
          <div className="error-message">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your password"
              />
              <button type="button" className="password-toggle" onClick={() => {
                const input = document.querySelector('.password-field input');
                input.type = input.type === 'password' ? 'text' : 'password';
              }}>👁</button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="submit-button">
            {isLoading ? 'Signing In...' : 'Sign In Securely'}
          </button>
        </form>

        <div className="footer">
          Don&apos;t have an account? <Link to="/signup" className="footer-link">Create New Account</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
