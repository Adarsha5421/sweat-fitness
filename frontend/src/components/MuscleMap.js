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
        <div className="absolute top-[18%] left-[14%] w-24 h-12 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Chest")} />
        <div className="absolute top-[28%] left-[37.5%] w-6 h-28 rotate-[2.65rad] bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Arms")} />
        <div className="absolute top-[28%] left-[88.5%] w-6 h-28 rotate-[2.65rad] bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Arms")} />
        <div className="absolute top-[28%] left-[6.2%] w-6 h-28 rotate-[-2.65rad] bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Arms")} />
        <div className="absolute top-[28%] left-[58.5%] w-6 h-28 rotate-[-2.65rad] bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Arms")} />
        <div className="absolute top-[15%] left-[68%] w-20 h-32 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Back")} />
        <div className="absolute top-[50%] left-[15%] w-10 h-44 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Legs")} />
        <div className="absolute top-[50%] left-[25%] w-10 h-44 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Legs")} />
        <div className="absolute top-[50%] left-[67.5%] w-10 h-44 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Legs")} />
        <div className="absolute top-[50%] left-[77%] w-10 h-44 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Legs")} />
        <div className="absolute top-[30%] left-[18.35%] w-14 h-14 bg-transparent cursor-pointer" onClick={() => handleMuscleClick("Abs")} />
      </div>

      {/* Selected Body Part Indicator */}
      {selectedPart ? (
        <p className="mt-4 text-lg font-semibold text-blue-500">Showing workouts for: {selectedPart}</p>
      ) : (
        <p className="mt-4 text-lg font-semibold text-blue-500">Showing workouts for all body parts.</p>
      )}
    </div>
  );
}
