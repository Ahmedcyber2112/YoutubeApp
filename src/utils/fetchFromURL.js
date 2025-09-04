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
    const { data } = await axios(BASIC_URL + "/" + url, options);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    // Return empty data structure to prevent app crash
    return { items: [] };
  }
};
