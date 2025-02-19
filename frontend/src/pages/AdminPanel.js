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
    difficulty: "",
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

  // Handle form submission for creating a workout
  const handleWorkoutSubmit = async (e) => {
    e.preventDefault();
    await addWorkout(token, workoutForm);
    setWorkoutForm({
      name: "",
      bodyPart: "",
      difficulty: "",
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
        <input
          type="text"
          name="bodyPart"
          placeholder="Body Part"
          required
          className="border p-2 w-full"
          value={workoutForm.bodyPart}
          onChange={(e) => setWorkoutForm({ ...workoutForm, bodyPart: e.target.value })}
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Workout
        </button>
      </form>

      {/* List of workouts (deletable) */}
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            {w.name} <button onClick={() => removeWorkout(token, w._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
