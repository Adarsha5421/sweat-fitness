import create from "zustand";
import { calculateCalories, calculateMacros, calculateOneRepMax } from "../api/calculatorApi";

const useCalculatorStore = create((set) => ({
  calories: null,
  macros: null,
  oneRepMax: null,
  loading: false,
  error: null,

  // Calculate Calories (TDEE/BMR)
  getCalories: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await calculateCalories(data);
      set({ calories: result, loading: false });
    } catch (error) {
      set({ error: "Failed to calculate calories", loading: false });
    }
  },

  // Calculate Macros
  getMacros: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await calculateMacros(data);
      set({ macros: result, loading: false });
    } catch (error) {
      set({ error: "Failed to calculate macros", loading: false });
    }
  },

  // Calculate One-Rep Max
  getOneRepMax: async (data) => {
    set({ loading: true, error: null });
    try {
      const result = await calculateOneRepMax(data);
      set({ oneRepMax: result, loading: false });
    } catch (error) {
      set({ error: "Failed to calculate one-rep max", loading: false });
    }
  },
}));

export default useCalculatorStore;
