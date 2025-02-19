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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Workout Library</h1>

      {/* Muscle Map Component */}
      <MuscleMap onSelect={handleFilterByBodyPart} />

      {/* Filter Controls */}
      <div className="flex justify-center gap-3 my-6">
        <select value={selectedDifficulty} onChange={(e) => handleFilterByDifficulty(e.target.value)} className="px-4 py-2 rounded border">
          <option value="">All Difficulty Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button onClick={() => handleFilterByBodyPart("")} className="px-4 py-2 bg-red-500 text-white rounded">
          Clear Filters
        </button>
      </div>

      {/* Loading/Error Handling */}
      {loading && <p className="text-center">Loading workouts...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {filteredWorkouts.length === 0 && !loading && <p className="text-center text-gray-500">No workouts found.</p>}

      {/* Workout List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout) => (
          <div key={workout._id} className="border rounded-lg p-4 shadow-md bg-white">
            <h2 className="text-xl font-semibold">{workout.name}</h2>
            <p className="text-gray-600">{workout.bodyPart}</p>
            <p className="text-gray-500">Difficulty: {workout.difficulty}</p>
            {workout.videoUrl && (
              <video className="w-full mt-2" controls>
                <source src={workout.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
