import { useState } from "react";
import useCalculatorStore from "../store/calculatorStore";

export default function Calculator() {
  const { getCalories, getMacros, getOneRepMax, calories, macros, oneRepMax, loading, error } = useCalculatorStore();
  const [input, setInput] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    activityLevel: "sedentary",
    goal: "maintain",
    reps: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCalculate = (type) => {
    if (type === "calories") getCalories(input);
    if (type === "macros") getMacros(input);
    if (type === "oneRepMax") getOneRepMax(input);
  };

  return (
    <div className="bg-black text-white min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-red-500 mb-8">Fitness Calculators</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ✅ Calorie Calculator */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-500 mb-4">Calorie Calculator</h2>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={input.weight}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={input.height}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={input.age}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <select name="gender" value={input.gender} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="activityLevel" value={input.activityLevel} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
          <button onClick={() => handleCalculate("calories")} className="w-full my-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Calculate
          </button>
          {calories && (
            <p className="mt-4 text-center text-lg">
              Daily Calories Needed: <strong className="text-red-400">{calories.caloriesNeeded} kcal</strong>
            </p>
          )}
        </div>

        {/* ✅ Macro Calculator */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-500 mb-4">Macro Calculator</h2>
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={input.weight}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <select name="goal" value={input.goal} onChange={handleChange} className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white">
            <option value="bulk">Bulking</option>
            <option value="cut">Cutting</option>
            <option value="maintain">Maintain</option>
          </select>
          <button onClick={() => handleCalculate("macros")} className="w-full my-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Calculate
          </button>
          {macros && (
            <p className="mt-4 text-center text-lg">
              <span className="text-red-400">Protein:</span> <strong>{macros.macros.protein}g</strong>,<span className="text-red-400"> Carbs:</span>{" "}
              <strong>{macros.macros.carbs}g</strong>,<span className="text-red-400"> Fats:</span> <strong>{macros.macros.fats}g</strong>
            </p>
          )}
        </div>

        {/* ✅ One-Rep Max Calculator */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-red-500 mb-4">One-Rep Max Calculator</h2>
          <input
            type="number"
            name="weight"
            placeholder="Weight Lifted (kg)"
            value={input.weight}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <input
            type="number"
            name="reps"
            placeholder="Reps Performed"
            value={input.reps}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded my-2 text-white"
          />
          <button onClick={() => handleCalculate("oneRepMax")} className="w-full my-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Calculate
          </button>
          {oneRepMax && (
            <p className="mt-4 text-center text-lg">
              Estimated 1-Rep Max: <strong className="text-red-400">{oneRepMax.oneRepMax} kg</strong>
            </p>
          )}
        </div>
      </div>

      {/* ✅ Loading & Error Messages */}
      {loading && <p className="text-center text-gray-400 mt-6">Calculating...</p>}
      {error && <p className="text-center text-red-500 mt-6">{error}</p>}
    </div>
  );
}
