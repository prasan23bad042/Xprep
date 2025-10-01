import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Import Firebase tools
import { createUserWithEmailAndPassword } from "firebase/auth";
import  {auth}  from "../firebase"; // Import the initialized auth object

// This component receives onSignupSuccess from App.jsx
function SignupPage({ onSignupSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Kept for future use, but not strictly needed for Firebase Auth
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 2. Update the handleSignup function to use Firebase
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // THIS line creates the user account in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // If successful, log the user in and redirect
      console.log("User registered:", userCredential.user.uid);
      onSignupSuccess(true); // Tell App.jsx the user is logged in
      navigate("/age-gate");
    } catch (error) {
      // Handle specific Firebase errors (e.g., email already in use, weak password)
      console.error("Registration failed:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    // Tailwind classes for a professional centered form
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Create Your Account
        </h2>

        {/* Display Error Message */}
        {error && (
          <p className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-lg text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

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
              placeholder="Min 6 characters"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-150"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
