import { googleLogin } from "../api/authApi";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <button onClick={googleLogin} className="bg-blue-500 px-6 py-3 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
}
