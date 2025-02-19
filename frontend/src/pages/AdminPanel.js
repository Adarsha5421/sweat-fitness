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
    return <p className="text-center text-red-500">Access Denied. Admins Only.</p>;
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* USER MANAGEMENT */}
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="text-center">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                <select value={u.role} onChange={(e) => changeUserRole(token, u._id, e.target.value)} className="p-1 border rounded">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="border p-2">
                <button onClick={() => removeUser(token, u._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* WORKOUT MANAGEMENT */}
      <h2 className="text-2xl font-semibold mb-4">Manage Workouts</h2>
      <form onSubmit={handleWorkoutSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Workout Name"
          required
          className="border p-2 w-full"
          value={workoutForm.name}
          onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
        />
        <select name="bodyPart" required className="border p-2 w-full" value={workoutForm.bodyPart} onChange={(e) => setWorkoutForm({ ...workoutForm, bodyPart: e.target.value })}>
          <option value="">Select Body Part</option>
          <option value="Chest">Chest</option>
          <option value="Arms">Arms</option>
          <option value="Back">Back</option>
          <option value="Legs">Legs</option>
          <option value="Abs">Abs</option>
          <option value="Shoulders">Shoulders</option>
        </select>
        <select name="difficulty" className="border p-2 w-full" value={workoutForm.difficulty} onChange={(e) => setWorkoutForm({ ...workoutForm, difficulty: e.target.value })}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="equipment"
          placeholder="Equipment (optional)"
          className="border p-2 w-full"
          value={workoutForm.equipment}
          onChange={(e) => setWorkoutForm({ ...workoutForm, equipment: e.target.value })}
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          required
          className="border p-2 w-full"
          value={workoutForm.instructions}
          onChange={(e) => setWorkoutForm({ ...workoutForm, instructions: e.target.value })}
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL (optional)"
          className="border p-2 w-full"
          value={workoutForm.videoUrl}
          onChange={(e) => setWorkoutForm({ ...workoutForm, videoUrl: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Workout
        </button>
      </form>

      {/* List of workouts (deletable) */}
      {workouts.length > 0 ? <h2 className="text-2xl font-semibold mb-4">Available Workouts</h2> : ""}
      <ul>
        {workouts.map((w) =>
          w.name && w.bodyPart ? (
            <li key={w._id} className="border p-2 rounded flex justify-between">
              {w.name} ({w.bodyPart})
              <button onClick={() => removeWorkout(token, w._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                ❌
              </button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}
