import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Profile() {
  const { user, token, updateUser } = useAuthStore();
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
    await updateUser(token, formData);
    alert("Profile updated successfully!");
  };

  if (!user) return <p className="text-center text-red-500">You must log in to view your profile.</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Profile</h1>

      <div className="mb-4 text-center">
        <img src={user.profilePic} alt="Profile" className="w-20 h-20 rounded-full mx-auto" />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Weight (kg)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Height (cm)</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Fitness Goal</label>
          <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Muscle">Gain Muscle</option>
            <option value="Maintain">Maintain</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
}
