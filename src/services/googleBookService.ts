import axios from "axios";

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}&key=${API_KEY}`);
    console.log("this is reponse ", response);
    return response.data;
  } catch (error) {
    console.log("error fetching books ", error);
    throw error;
  }
};

export const getBookDetails = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookId}?key=${API_KEY}`);
    return response.data || {};
  } catch (error) {
    console.log("error fetching book ", error);
    throw error;
  }
};
