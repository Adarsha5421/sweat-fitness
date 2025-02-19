import axios from "axios";

const API_URL = "http://localhost:5000/api/calculators";

// Fetch Calorie Needs (TDEE/BMR)
export const calculateCalories = async (data) => {
  const res = await axios.post(`${API_URL}/calories`, data);
  return res.data;
};

// Fetch Macro Distribution
export const calculateMacros = async (data) => {
  const res = await axios.post(`${API_URL}/macros`, data);
  return res.data;
};

// Fetch One-Rep Max Estimation
export const calculateOneRepMax = async (data) => {
  const res = await axios.post(`${API_URL}/one-rep-max`, data);
  return res.data;
};
