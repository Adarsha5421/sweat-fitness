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

function App() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
  }, [setUser]);

  useEffect(() => {
    // Extract token from URL after Google login
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setUser(token);
      navigate("/profile"); // ✅ Fix: Redirect to Profile instead of Dashboard
    }
  }, [location, navigate, setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/calculators" element={<Calculators />} /> {/* ✅ Add Calculators Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
