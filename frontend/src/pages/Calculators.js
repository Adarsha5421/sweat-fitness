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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Fitness Calculators</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Calorie Calculator */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Calorie Calculator</h2>
          <input type="number" name="weight" placeholder="Weight (kg)" value={input.weight} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <input type="number" name="height" placeholder="Height (cm)" value={input.height} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <input type="number" name="age" placeholder="Age" value={input.age} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <select name="gender" value={input.gender} onChange={handleChange} className="w-full p-2 border rounded my-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select name="activityLevel" value={input.activityLevel} onChange={handleChange} className="w-full p-2 border rounded my-2">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
          <button onClick={() => handleCalculate("calories")} className="w-full bg-blue-500 text-white py-2 rounded">
            Calculate
          </button>
          {calories && (
            <p className="mt-2">
              Daily Calories Needed: <strong>{calories.caloriesNeeded}</strong>
            </p>
          )}
        </div>

        {/* Macro Calculator */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">Macro Calculator</h2>
          <input type="number" name="weight" placeholder="Weight (kg)" value={input.weight} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <select name="goal" value={input.goal} onChange={handleChange} className="w-full p-2 border rounded my-2">
            <option value="bulk">Bulking</option>
            <option value="cut">Cutting</option>
            <option value="maintain">Maintain</option>
          </select>
          <button onClick={() => handleCalculate("macros")} className="w-full bg-green-500 text-white py-2 rounded">
            Calculate
          </button>
          {macros && (
            <p className="mt-2">
              Protein: <strong>{macros.macros.protein}g</strong>, Carbs: <strong>{macros.macros.carbs}g</strong>, Fats: <strong>{macros.macros.fats}g</strong>
            </p>
          )}
        </div>

        {/* One-Rep Max Calculator */}
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-xl font-bold">One-Rep Max Calculator</h2>
          <input type="number" name="weight" placeholder="Weight Lifted (kg)" value={input.weight} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <input type="number" name="reps" placeholder="Reps Performed" value={input.reps} onChange={handleChange} className="w-full p-2 border rounded my-2" />
          <button onClick={() => handleCalculate("oneRepMax")} className="w-full bg-red-500 text-white py-2 rounded">
            Calculate
          </button>
          {oneRepMax && (
            <p className="mt-2">
              Estimated 1-Rep Max: <strong>{oneRepMax.oneRepMax} kg</strong>
            </p>
          )}
        </div>
      </div>

      {loading && <p className="text-center text-gray-500 mt-4">Calculating...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
    </div>
  );
}
