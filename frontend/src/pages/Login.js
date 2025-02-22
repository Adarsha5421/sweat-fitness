import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { googleLogin } from "../api/authApi";

export default function Login() {
  const { login, signup, forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        await signup(formData);
        alert("Signup successful! You can now log in.");
        setIsSignup(false);
      } else {
        await login(formData);
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!formData.email) return alert("Please enter your email first.");
    try {
      await forgotPassword(formData.email);
      alert("Password reset link sent to your email.");
    } catch {
      setError("Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6">{isSignup ? "Create an Account" : "Welcome Back"}</h1>
        <p className="text-gray-400 mb-6">{isSignup ? "Sign up to start your fitness journey." : "Sign in to access your dashboard."}</p>

        {/* ✅ Google Login */}
        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-red-700 mb-4"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 12.3c0-.9-.1-1.8-.2-2.7H12v5.1h6.5c-.3 1.4-1 2.6-2 3.5v3h3.3c2-1.9 3.2-4.7 3.2-8z" fill="#4285F4" />
            <path d="M12 24c3.2 0 5.8-1.1 7.7-3.1l-3.3-3c-1 0.7-2.3 1.1-3.7 1.1-2.9 0-5.4-1.9-6.3-4.5H2.3v3.1C4.3 21.2 7.9 24 12 24z" fill="#34A853" />
            <path d="M5.7 14.4c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V6.9H2.3C1.4 8.7 1 10.4 1 12c0 1.6.4 3.3 1.3 5.1l3.4-2.7z" fill="#FBBC05" />
            <path d="M12 4.6c1.7 0 3.1.6 4.3 1.7l3.2-3.2C17.8 1.1 15.2 0 12 0 7.9 0 4.3 2.8 2.3 6.9l3.4 2.7c.9-2.6 3.4-5 6.3-5z" fill="#EA4335" />
          </svg>
          {isSignup ? "Sign up with Google" : "Sign in with Google"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center text-gray-500 my-4">
          <hr className="w-full border-gray-600" />
          <span className="px-3">OR</span>
          <hr className="w-full border-gray-600" />
        </div>

        {/* ✅ Email & Password Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignup && <input type="text" name="name" placeholder="Full Name" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded" onChange={handleChange} />}
          <input type="email" name="email" placeholder="Email" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="w-full p-3 bg-gray-800 border border-gray-700 rounded" onChange={handleChange} />

          <button type="submit" disabled={loading} className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* ✅ Error Message */}
        {error && <p className="text-red-500 mt-3">{error}</p>}

        {/* ✅ Forgot Password */}
        {!isSignup && (
          <button onClick={handleForgotPassword} className="text-blue-400 mt-3 hover:underline">
            Forgot Password?
          </button>
        )}

        {/* ✅ Toggle between Login & Signup */}
        <p className="text-gray-400 mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-red-500 cursor-pointer hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          By continuing, you agree to our <span className="text-red-500 cursor-pointer hover:underline">Terms & Conditions</span>.
        </p>
      </div>
    </div>
  );
}
