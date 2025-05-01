

import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // update if hosted elsewhere

export const getSomething = async () => {
  try {
    const response = await axios.get("https://family-flavors.onrender.com/");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

