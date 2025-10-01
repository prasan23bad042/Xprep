import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import Firebase tools
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Import the initialized auth object

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const navigate = useNavigate();

  // 2. Update the handleLogin function to use Firebase
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // THIS is the line that talks to Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If successful, log the user in and redirect
      console.log("User logged in:", userCredential.user.uid);
      onLoginSuccess(true); // Tell App.jsx the user is logged in
      navigate("/age-gate");
    } catch (error) {
      // If Firebase returns an error (like 'user-not-found' or 'wrong-password')
      console.error("Login failed:", error.code);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Invalid credentials. Check your email and password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    // Tailwind classes for a professional centered form
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome Back!
        </h2>

        {/* Display Error Message */}
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Your secret password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-150"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
