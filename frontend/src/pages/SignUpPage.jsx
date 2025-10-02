import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function SignupPage({ onSignupSuccess }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await createUserWithEmailAndPassword(auth, email, password)

      // Note: You would normally save the username to Firestore here,
      // but for now, we proceed to Age Gate.

      onSignupSuccess(true)
      navigate("/age-gate")
    } catch (error) {
      console.error("Registration failed:", error.code)
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.")
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters long.")
      } else {
        setError("Registration failed. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Sophisticated background patterns */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-200/40 to-green-200/40 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-200/40 to-teal-200/40 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        {/* Secondary smaller orbs */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-teal-200/30 to-green-200/30 rounded-full blur-2xl"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.05)_1px,transparent_0)] bg-[length:24px_24px]"></div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 4) * 15}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main authentication card */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-10 md:p-12 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:bg-white/90">
          {/* Header section */}
          <div className="text-center mb-10">
            {/* Brand icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 rounded-2xl mb-6 shadow-2xl shadow-emerald-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
              <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
            <div className="mb-8 p-5 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl flex items-start space-x-3 animate-pulse">
              <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-800 mb-1">Registration Error</h3>
                <p className="text-sm text-red-700 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-7">
            {/* Username field */}
            <div className="space-y-3">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Choose a unique username"
                  className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-3">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-3">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-800 uppercase tracking-wide">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 bg-white/70 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-0 focus:border-emerald-500 focus:bg-white transition-all duration-300 text-gray-900 placeholder-gray-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 rounded-r-2xl transition-colors duration-200"
                  onClick={() => {
                    const input = document.getElementById('password')
                    input.type = input.type === 'password' ? 'text' : 'password'
                  }}
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 px-8 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 hover:from-emerald-700 hover:via-green-700 hover:to-teal-800 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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
                <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
              </div>
            </div>

            {/* Sign in link */}
            <Link
              to="/login"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-60 animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}

export default SignupPage
