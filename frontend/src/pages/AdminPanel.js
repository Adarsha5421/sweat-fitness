import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useAdminStore from "../store/adminStore";
import useWorkoutStore from "../store/workoutStore";

export default function AdminPanel() {
  const { user, token } = useAuthStore();
  const { users, loadUsers, changeUserRole, removeUser } = useAdminStore();
  const { workouts, loadWorkouts, addWorkout, removeWorkout } = useWorkoutStore();

  const [workoutForm, setWorkoutForm] = useState({
    name: "",
    bodyPart: "",
    difficulty: "Beginner",
    equipment: "",
    instructions: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (token) {
      loadUsers(token);
      loadWorkouts();
    }
  }, [token, loadUsers, loadWorkouts]);

  if (!user || user.role !== "admin") {
    return <p className="text-center text-red-500 text-lg mt-6">🚫 Access Denied. Admins Only.</p>;
  }

  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    await addWorkout(token, workoutForm);
    setWorkoutForm({
      name: "",
      bodyPart: "",
      difficulty: "Beginner",
      equipment: "",
      instructions: "",
      videoUrl: "",
    });
  };

  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">Admin Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* ✅ USER MANAGEMENT */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Manage Users</h2>
          <div className="overflow-auto">
            <table className="w-full border border-gray-700">
              <thead>
                <tr className="bg-gray-900 text-red-500">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="text-center border border-gray-800">
                    <td className="border p-2">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">
                      <select value={u.role} onChange={(e) => changeUserRole(token, u._id, e.target.value)} className="p-1 bg-gray-800 border border-gray-600 rounded text-white">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <button onClick={() => removeUser(token, u._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ WORKOUT MANAGEMENT */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-red-400">Manage Workouts</h2>
          <form onSubmit={handleWorkoutSubmit} className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-4">Add New Workout</h3>
            <input
              type="text"
              name="name"
              placeholder="Workout Name"
              required
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.name}
              onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
            />
            <select
              name="bodyPart"
              required
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.bodyPart}
              onChange={(e) => setWorkoutForm({ ...workoutForm, bodyPart: e.target.value })}
            >
              <option value="">Select Body Part</option>
              <option value="Chest">Chest</option>
              <option value="Arms">Arms</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Abs">Abs</option>
              <option value="Shoulders">Shoulders</option>
            </select>
            <select
              name="difficulty"
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.difficulty}
              onChange={(e) => setWorkoutForm({ ...workoutForm, difficulty: e.target.value })}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <input
              type="text"
              name="equipment"
              placeholder="Equipment (optional)"
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.equipment}
              onChange={(e) => setWorkoutForm({ ...workoutForm, equipment: e.target.value })}
            />
            <input
              type="text"
              name="videoUrl"
              placeholder="Video URL (optional)"
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.videoUrl}
              onChange={(e) => setWorkoutForm({ ...workoutForm, videoUrl: e.target.value })}
            />
            <textarea
              name="instructions"
              placeholder="Instructions"
              required
              className="border p-2 w-full bg-gray-800 text-white rounded my-2"
              value={workoutForm.instructions}
              onChange={(e) => setWorkoutForm({ ...workoutForm, instructions: e.target.value })}
            />
            <button type="submit" className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              Add Workout
            </button>
          </form>

          {/* ✅ List of Workouts */}
          {workouts.length > 0 && <h3 className="text-xl font-semibold mt-6 text-red-400">Available Workouts</h3>}
          <ul className="mt-4">
            {workouts.map((w) => (
              <li key={w._id} className="flex justify-between items-center p-2 border border-gray-700 rounded bg-gray-800 my-2">
                <span>
                  {w.name} ({w.bodyPart})
                </span>
                <button onClick={() => removeWorkout(token, w._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
