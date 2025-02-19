import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import useWorkoutStore from "../store/workoutStore";

export default function Home() {
  const { user } = useAuthStore();
  const { workouts, loadWorkouts } = useWorkoutStore();
  const [featuredWorkouts, setFeaturedWorkouts] = useState([]);

  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]);

  useEffect(() => {
    if (workouts.length > 0) {
      const shuffled = [...workouts].sort(() => 0.5 - Math.random());
      setFeaturedWorkouts(shuffled.slice(0, 3));
    }
  }, [workouts]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔥 Hero Section */}
      <div className="text-center py-16 bg-gradient-to-b from-red-700 to-black">
        <h1 className="text-5xl font-bold text-gray-300 uppercase">Sweat Fitness</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">Achieve your fitness goals with expert-designed workout programs and tools.</p>
        <div className="mt-6 flex justify-center space-x-6">
          <Link to="/workouts" className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition">
            Explore Workouts
          </Link>
          <Link to="/calculators" className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition">
            Fitness Calculators
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition">
                My Profile
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="px-6 py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <Link to="/login" className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
              Login / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* 🔥 Featured Workouts Section */}
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-red-500 text-center uppercase">Featured Workouts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {featuredWorkouts.map((workout) => (
            <div key={workout._id} className="bg-gray-900 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold text-white">{workout.name}</h3>
              <p className="text-red-400">{workout.bodyPart}</p>
              <p className="text-gray-400">Difficulty: {workout.difficulty}</p>

              {/* ✅ Video or YouTube Embed */}
              {workout.videoUrl && (
                <div className="mt-4">
                  {workout.videoUrl.includes("youtube.com") || workout.videoUrl.includes("youtu.be") ? (
                    <iframe
                      className="w-full h-80 rounded-lg"
                      src={workout.videoUrl.replace("watch?v=", "embed/")}
                      title="Workout Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video className="w-full rounded-lg" controls>
                      <source src={workout.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )}

              <Link to={`/workouts/${workout._id}`} className="mt-4 block px-4 py-2 bg-red-500 text-white text-center rounded-lg hover:bg-red-700 transition">
                View Workout
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
