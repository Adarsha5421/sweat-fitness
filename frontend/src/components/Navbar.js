import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        Sweat Fitness
      </Link>

      <div className="flex space-x-4">
        <Link to="/workouts">Workouts</Link>
        <Link to="/calculators">Calculators</Link>

        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <Link to="/profile">Profile</Link>
            <img src={user.profilePic} alt="User" className="w-10 h-10 rounded-full inline-block mx-2" />
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
