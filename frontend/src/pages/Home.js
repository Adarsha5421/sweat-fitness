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
      // Pick 3 random workouts to display as "Featured Workouts"
      const shuffled = [...workouts].sort(() => 0.5 - Math.random());
      setFeaturedWorkouts(shuffled.slice(0, 3));
    }
  }, [workouts]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to Sweat Fitness</h1>
        <p className="text-lg text-gray-600 mt-2">Your ultimate destination for personalized workouts, fitness tracking, and nutrition planning.</p>
      </div>

      {/* Quick Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <Link to="/workouts" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
          Explore Workouts
        </Link>
        <Link to="/calculators" className="px-6 py-3 bg-green-500 text-white rounded-lg">
          Try Calculators
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="px-6 py-3 bg-gray-700 text-white rounded-lg">
              Go to Profile
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="px-6 py-3 bg-red-500 text-white rounded-lg">
                Admin Panel
              </Link>
            )}
          </>
        ) : (
          <Link to="/login" className="px-6 py-3 bg-yellow-500 text-white rounded-lg">
            Login / Sign Up
          </Link>
        )}
      </div>

      {/* Featured Workouts Section */}
      <h2 className="text-2xl font-bold mb-4">Featured Workouts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredWorkouts.map((workout) => (
          <div key={workout._id} className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-xl font-semibold">{workout.name}</h3>
            <p className="text-gray-600">{workout.bodyPart}</p>
            <p className="text-gray-500">Difficulty: {workout.difficulty}</p>
            {workout.videoUrl && (
              <div className="w-full mt-2">
                {workout.videoUrl.includes("youtube.com") || workout.videoUrl.includes("youtu.be") ? (
                  <iframe
                    className="w-full h-64 md:h-80 lg:h-96"
                    src={workout.videoUrl.replace("watch?v=", "embed/")} // ✅ Converts YouTube links to embed URLs
                    title="Workout Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video className="w-full mt-2" controls>
                    <source src={workout.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            <Link to={`/workouts/${workout._id}`} className="mt-3 block px-4 py-2 bg-blue-500 text-white text-center rounded">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
