import { googleLogin } from "../api/authApi";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-6">Welcome Back</h1>
        <p className="text-gray-400 mb-6">Sign in to access your personalized fitness dashboard.</p>

        <button
          onClick={googleLogin}
          className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-105 hover:bg-red-700"
        >
          <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.5 12.3c0-.9-.1-1.8-.2-2.7H12v5.1h6.5c-.3 1.4-1 2.6-2 3.5v3h3.3c2-1.9 3.2-4.7 3.2-8z" fill="#4285F4" />
            <path d="M12 24c3.2 0 5.8-1.1 7.7-3.1l-3.3-3c-1 0.7-2.3 1.1-3.7 1.1-2.9 0-5.4-1.9-6.3-4.5H2.3v3.1C4.3 21.2 7.9 24 12 24z" fill="#34A853" />
            <path d="M5.7 14.4c-.2-.7-.3-1.4-.3-2.2s.1-1.5.3-2.2V6.9H2.3C1.4 8.7 1 10.4 1 12c0 1.6.4 3.3 1.3 5.1l3.4-2.7z" fill="#FBBC05" />
            <path d="M12 4.6c1.7 0 3.1.6 4.3 1.7l3.2-3.2C17.8 1.1 15.2 0 12 0 7.9 0 4.3 2.8 2.3 6.9l3.4 2.7c.9-2.6 3.4-5 6.3-5z" fill="#EA4335" />
          </svg>
          Sign in with Google
        </button>

        <p className="text-gray-500 mt-6 text-sm">
          By signing in, you agree to our <span className="text-red-500 cursor-pointer hover:underline">Terms & Conditions</span>.
        </p>
      </div>
    </div>
  );
}
