import { useState } from "react";

export default function EditWorkout({ workout, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: workout.name || "",
    bodyPart: workout.bodyPart || "",
    difficulty: workout.difficulty || "Beginner",
    equipment: workout.equipment || "",
    instructions: workout.instructions || "",
    videoUrl: workout.videoUrl || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Edit Workout</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Workout Name"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={formData.name}
            onChange={handleChange}
          />
          <select name="bodyPart" required className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" value={formData.bodyPart} onChange={handleChange}>
            <option value="">Select Body Part</option>
            <option value="Chest">Chest</option>
            <option value="Arms">Arms</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Abs">Abs</option>
            <option value="Shoulders">Shoulders</option>
          </select>
          <select name="difficulty" className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" value={formData.difficulty} onChange={handleChange}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <input
            type="text"
            name="equipment"
            placeholder="Equipment (optional)"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={formData.equipment}
            onChange={handleChange}
          />
          <textarea
            name="instructions"
            placeholder="Instructions"
            required
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={formData.instructions}
            onChange={handleChange}
          />
          <input
            type="text"
            name="videoUrl"
            placeholder="Video URL (optional)"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            value={formData.videoUrl}
            onChange={handleChange}
          />
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
