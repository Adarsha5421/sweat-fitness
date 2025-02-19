import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    fitnessGoal: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        age: user.age || "",
        weight: user.weight || "",
        height: user.height || "",
        fitnessGoal: user.fitnessGoal || "Maintain",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    alert("✅ Profile updated successfully!");
  };

  if (!user) return <div className="text-center text-red-500 text-lg mt-10">🚫 You must log in to view your profile.</div>;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-red-500 mb-6">Your Profile</h1>

      {/* Profile Info */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center">
          <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full mx-auto border-4 border-red-500 shadow-md" />
          <h2 className="text-2xl font-semibold mt-3">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm font-semibold mb-1">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 text-sm font-semibold mb-1">Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 text-sm font-semibold mb-1">Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 text-sm font-semibold mb-1">Fitness Goal</label>
            <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white">
              <option value="Lose Weight">Lose Weight</option>
              <option value="Gain Muscle">Gain Muscle</option>
              <option value="Maintain">Maintain</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-red-500 text-white py-2 rounded font-semibold hover:bg-red-600 transition">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
