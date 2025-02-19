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

  if (loading) return <p className="text-center text-gray-400 mt-10">Loading workout details...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!selectedWorkout) return <p className="text-center text-gray-500 mt-10">Workout not found.</p>;

  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      {/* ✅ Back Button */}
      <button onClick={() => navigate(-1)} className="mb-6 px-6 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition">
        ← Back to Workouts
      </button>

      {/* ✅ Workout Details */}
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">{selectedWorkout.name}</h1>
        <p className="text-gray-400 mt-2 text-lg">
          Body Part: <span className="text-gray-300">{selectedWorkout.bodyPart}</span>
        </p>
        <p className="text-gray-400">
          Difficulty: <span className="text-gray-300">{selectedWorkout.difficulty}</span>
        </p>
        <p className="mt-6 text-gray-300">{selectedWorkout.instructions}</p>

        {/* ✅ Video Embed (YouTube / MP4) */}
        {selectedWorkout.videoUrl && (
          <div className="w-full mt-6">
            {selectedWorkout.videoUrl.includes("youtube.com") || selectedWorkout.videoUrl.includes("youtu.be") ? (
              <iframe
                className="w-full h-96 md:h-96 rounded-lg"
                src={selectedWorkout.videoUrl.replace("watch?v=", "embed/")}
                title="Workout Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video className="w-full rounded-lg" controls>
                <source src={selectedWorkout.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
