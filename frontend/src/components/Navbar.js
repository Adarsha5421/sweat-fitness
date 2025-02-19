import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-red-600">
      {/* Left Section - Logo */}
      <Link to="/" className="text-2xl font-bold text-red-500 tracking-wide hover:text-red-400 transition">
        <img src={logo} alt="Sweat Fitness Logo" className="rounded-full h-14 w-14 hover:opacity-80 transition" />
      </Link>

      {/* Right Section - Profile & Auth Links */}
      <div className="flex items-center space-x-4">
        <Link to="/workouts" className="hover:text-red-500 transition">
          Workouts
        </Link>
        <Link to="/calculators" className="hover:text-red-500 transition">
          Calculators
        </Link>
        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className=" hover:text-red-500 transition">
                Admin
              </Link>
            )}
            <Link to="/profile" className="hover:text-red-500 transition">
              <img src={user.profilePic} alt="User" className="w-10 h-10 rounded-full border-2 border-red-500 shadow-md" />
            </Link>

            <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-700 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
