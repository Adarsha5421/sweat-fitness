import { useState } from "react";
import useWorkoutStore from "../store/workoutStore";
import muscleMapSvg from "../assets/muscle-map.svg"; // Replace with your muscle map image

export default function MuscleMap() {
  const { filterByBodyPart, loadWorkouts } = useWorkoutStore();
  const [selectedPart, setSelectedPart] = useState("");

  const handleMuscleClick = (bodyPart) => {
    if (bodyPart === selectedPart) {
      setSelectedPart("");
      loadWorkouts(); // Load all workouts when cleared
    } else {
      setSelectedPart(bodyPart);
      filterByBodyPart(bodyPart);
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-2xl font-bold mb-4">Select a Body Part</h2>
      <div className="relative">
        <img src={muscleMapSvg} alt="Muscle Map" className="w-[500px] cursor-pointer" />
        {/* Clickable Areas - You can modify these positions */}
        <div className="absolute top-[20%] left-[40%] w-6 h-6 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Chest")} />
        <div className="absolute top-[30%] left-[50%] w-6 h-6 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Arms")} />
        <div className="absolute top-[40%] left-[30%] w-6 h-6 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Back")} />
        <div className="absolute top-[60%] left-[45%] w-6 h-6 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Legs")} />
        <div className="absolute top-[50%] left-[38%] w-6 h-6 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Abs")} />
      </div>

      {/* Selected Body Part Indicator */}
      {selectedPart && <p className="mt-4 text-lg font-semibold text-blue-500">Showing workouts for: {selectedPart}</p>}
    </div>
  );
}
