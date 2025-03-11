import axios from "axios";

const APP_KEY = import.meta.env.VITE_APP_URL_KEY;
const APP_URL = import.meta.env.VITE_APP_URL;

export const getAllProducts = async (searchTerm, pageNumber) => {
  try {
    const response = await axios.get(
      `${APP_URL}wlm/walmart-search-by-keyword?keyword=${searchTerm}&page=${pageNumber}&sortBy=best_match`,
      {
        headers: {
          "X-RapidAPI-Key": APP_KEY,
          "X-RapidAPI-Host": "axesso-walmart-data-service.p.rapidapi.com",
        },
      }
    );
    return response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
