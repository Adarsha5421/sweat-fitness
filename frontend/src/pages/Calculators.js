import { useState } from "react";
import useCalculatorStore from "../store/calculatorStore";

export default function Calculators() {
  const { getCalories, getMacros, getOneRepMax, calories, macros, oneRepMax, error } = useCalculatorStore();
  const [calorieForm, setCalorieForm] = useState({ age: "", weight: "", height: "", gender: "male", activityLevel: "moderate" });
  const [macroForm, setMacroForm] = useState({ calories: "", goal: "Maintain" });
  const [oneRepMaxForm, setOneRepMaxForm] = useState({ weight: "", reps: "" });

  const handleSubmitCalories = (e) => {
    e.preventDefault();
    getCalories(calorieForm);
  };

  const handleSubmitMacros = (e) => {
    e.preventDefault();
    getMacros(macroForm);
  };

  const handleSubmitOneRepMax = (e) => {
    e.preventDefault();
    getOneRepMax(oneRepMaxForm);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Fitness Calculators</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Calorie Calculator */}
      <div className="border p-4 rounded-lg shadow-md bg-white mb-6">
        <h2 className="text-xl font-semibold mb-4">Calorie Calculator</h2>
        <form onSubmit={handleSubmitCalories} className="space-y-3">
          <input
            type="number"
            placeholder="Age"
            value={calorieForm.age}
            onChange={(e) => setCalorieForm({ ...calorieForm, age: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={calorieForm.weight}
            onChange={(e) => setCalorieForm({ ...calorieForm, weight: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={calorieForm.height}
            onChange={(e) => setCalorieForm({ ...calorieForm, height: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <select value={calorieForm.activityLevel} onChange={(e) => setCalorieForm({ ...calorieForm, activityLevel: e.target.value })} className="w-full p-2 border rounded">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="high">High Activity</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Calculate
          </button>
        </form>
        {calories && (
          <p className="mt-4 text-center">
            Your daily calorie needs: <strong>{calories.total} kcal</strong>
          </p>
        )}
      </div>

      {/* Macro Calculator */}
      <div className="border p-4 rounded-lg shadow-md bg-white mb-6">
        <h2 className="text-xl font-semibold mb-4">Macro Calculator</h2>
        <form onSubmit={handleSubmitMacros} className="space-y-3">
          <input
            type="number"
            placeholder="Total Calories"
            value={macroForm.calories}
            onChange={(e) => setMacroForm({ ...macroForm, calories: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <select value={macroForm.goal} onChange={(e) => setMacroForm({ ...macroForm, goal: e.target.value })} className="w-full p-2 border rounded">
            <option value="Maintain">Maintain</option>
            <option value="Lose Fat">Lose Fat</option>
            <option value="Gain Muscle">Gain Muscle</option>
          </select>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Calculate
          </button>
        </form>
        {macros && (
          <p className="mt-4 text-center">
            Protein: {macros.protein}g, Carbs: {macros.carbs}g, Fats: {macros.fats}g
          </p>
        )}
      </div>

      {/* One-Rep Max Calculator */}
      <div className="border p-4 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4">One-Rep Max Calculator</h2>
        <form onSubmit={handleSubmitOneRepMax} className="space-y-3">
          <input
            type="number"
            placeholder="Weight Lifted (kg)"
            value={oneRepMaxForm.weight}
            onChange={(e) => setOneRepMaxForm({ ...oneRepMaxForm, weight: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Reps Performed"
            value={oneRepMaxForm.reps}
            onChange={(e) => setOneRepMaxForm({ ...oneRepMaxForm, reps: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-red-500 text-white p-2 rounded">
            Calculate
          </button>
        </form>
        {oneRepMax && (
          <p className="mt-4 text-center">
            Estimated One-Rep Max: <strong>{oneRepMax.max} kg</strong>
          </p>
        )}
      </div>
    </div>
  );
}
