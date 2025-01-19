import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.API_KEY1;

const SUBJECTS = [
  'fiction',
  'science',
  'history',
  'philosophy',
  'art',
  'technology',
  'poetry',
  'biography',
  'fantasy',
  'mystery'
];

export const searchBooks = async (query: string) => {
  console.log("query", query);
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

export const searchFreeBooks = async (query?: string) => {
  if (!query) {
    query = "a";
  }
  try {
    const response = await axios.get(
      `${BASE_URL}?q=a&filter=free-ebooks&maxResults=40&key=${API_KEY}`
    );
    console.log("this is result ", response);
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching free books:", error);
    throw error;
  }
};

export const getRandomBooks = async (maxResults: number = 10) => {
  try {
    // Get a random subject
    const randomSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    
    // Add some randomization to the ordering using the orderBy parameter
    const orderBy = Math.random() > 0.5 ? 'newest' : 'relevance';
    
    // Calculate a random starting index to get different books each time
    const startIndex = Math.floor(Math.random() * 40); // Google Books API max is 40

    const response = await axios.get(
      `${BASE_URL}?q=subject:${randomSubject}&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`
    );
    // console.log("this is result ", response);
    return response.data.items || [];
  } catch (error) {
    console.error("Error fetching random books:", error);
    throw error;
  }
};
