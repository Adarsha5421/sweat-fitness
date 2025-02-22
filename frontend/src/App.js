import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutDetails from "./pages/WorkoutDetails";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Calculators from "./pages/Calculators";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import useAuthStore from "./store/authStore";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { loadUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // ✅ Extract token from URL after Google login
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      loadUser();
      navigate("/profile");
    }
  }, [location, navigate, loadUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/calculators" element={<Calculators />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
