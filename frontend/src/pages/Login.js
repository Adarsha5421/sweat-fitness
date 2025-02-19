import { googleLogin } from "../api/authApi";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Gym Tracker</h1>
      <button onClick={googleLogin} className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
        Sign in with Google
      </button>
    </div>
  );
}
