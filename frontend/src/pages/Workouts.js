import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWorkoutStore from "../store/workoutStore";
import MuscleMap from "../components/MuscleMap";

export default function Workouts() {
  const { workouts, loadWorkouts, filterByBodyPart, loading, error } = useWorkoutStore();
  const [setSelectedBodyPart] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  useEffect(() => {
    loadWorkouts(); // Load all workouts on page load
  }, [loadWorkouts]);

  const handleFilterByBodyPart = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    if (bodyPart) {
      filterByBodyPart(bodyPart);
    } else {
      loadWorkouts();
    }
  };

  const handleFilterByDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  // Apply Difficulty Filter on Workouts List
  const filteredWorkouts = selectedDifficulty ? workouts.filter((workout) => workout.difficulty === selectedDifficulty) : workouts;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* 🔥 Header */}
      <div className="text-center py-12 bg-gradient-to-b from-red-700 to-black">
        <h1 className="text-4xl font-bold text-gray-300 uppercase">Workout Library</h1>
        <p className="mt-2 text-lg text-gray-300">Browse expert-designed workouts for your fitness journey.</p>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* 🔥 Muscle Map Component */}
        <MuscleMap onSelect={handleFilterByBodyPart} />

        {/* 🔥 Filter Controls */}
        <div className="flex justify-center gap-4 mt-6">
          <select value={selectedDifficulty} onChange={(e) => handleFilterByDifficulty(e.target.value)} className="px-4 py-2 rounded bg-gray-900 border border-red-500 text-white">
            <option value="">All Difficulty Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* 🔥 Loading & Error Handling */}
        {loading && <p className="text-center text-gray-400 mt-6">Loading workouts...</p>}
        {error && <p className="text-center text-red-500 mt-6">{error}</p>}
        {filteredWorkouts.length === 0 && !loading && <p className="text-center text-gray-500 mt-6">No workouts found.</p>}

        {/* 🔥 Workout List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 ">
          {filteredWorkouts.map((workout) => (
            <div key={workout._id} className="bg-gray-900  p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-xl font-semibold text-white">{workout.name}</h2>
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
