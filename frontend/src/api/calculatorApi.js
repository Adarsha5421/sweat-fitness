import axios from "axios";

const API_URL = "http://localhost:5000/api/calculators"; // ✅ Fix route prefix

// Helper function to convert an object into query string
const createQueryParams = (data) => {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};

// Fetch Calorie Needs (TDEE/BMR) ✅ Use GET and Query Parameters
export const calculateCalories = async (data) => {
  const query = createQueryParams(data);
  const res = await axios.get(`${API_URL}/calories?${query}`);
  return res.data;
};

// Fetch Macro Distribution ✅ Use GET and Query Parameters
export const calculateMacros = async (data) => {
  const query = createQueryParams(data);
  const res = await axios.get(`${API_URL}/macros?${query}`);
  return res.data;
};

// Fetch One-Rep Max Estimation ✅ Use GET and Query Parameters
export const calculateOneRepMax = async (data) => {
  const query = createQueryParams(data);
  const res = await axios.get(`${API_URL}/one-rep-max?${query}`);
  return res.data;
};
