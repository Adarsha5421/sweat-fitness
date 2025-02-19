import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useWorkoutStore from "../store/workoutStore";

export default function WorkoutDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedWorkout, loadWorkoutDetails, loading, error } = useWorkoutStore();

  useEffect(() => {
    loadWorkoutDetails(id);
  }, [id, loadWorkoutDetails]);

  if (loading) return <p className="text-center">Loading workout details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!selectedWorkout) return <p className="text-center">Workout not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-300 rounded">
        ← Back to Workouts
      </button>
      <h1 className="text-3xl font-bold">{selectedWorkout.name}</h1>
      <p className="text-gray-600">{selectedWorkout.bodyPart}</p>
      <p className="text-gray-500">Difficulty: {selectedWorkout.difficulty}</p>
      <p className="mt-4">{selectedWorkout.instructions}</p>
      {selectedWorkout.videoUrl && (
        <video className="w-full mt-4" controls>
          <source src={selectedWorkout.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
