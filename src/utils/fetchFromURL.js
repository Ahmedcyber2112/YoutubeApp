import axios from "axios";

const BASIC_URL = "https://youtube-v31.p.rapidapi.com";
const options = {
  params: { maxResults: 100 },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY || "ca90a6db1cmsh82f3e7dead0ecb1p18d8dbjsn45fffd5d914b",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    console.log("Fetching from:", BASIC_URL + "/" + url);
    const { data } = await axios(BASIC_URL + "/" + url, options);
    console.log("API Response:", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    // Return empty data structure to prevent app crash
    return { items: [] };
  }
};
