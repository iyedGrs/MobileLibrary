import { useState } from "react";
import { getRandomBooks, searchBooks, searchFreeBooks } from "../services/googleBookService";

export const useBooks = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (query: string) => {
    setBooks([]);
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      // console.log("tthis is hook books ", results);
      setBooks(results);
    } catch (error) {
      setError("Failed to fetch books Please try again ");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchFreeBooks = async () => {
    setBooks([]);
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchFreeBooks();
      setBooks(results);
    } catch (error) {
      setError("Failed to fetch books Please try again ");
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRandomBooks = async () => {
    setBooks([]);
    setIsLoading(true);
    setError(null);
    try {
      const results = await getRandomBooks();
      setBooks(results);
    } catch (error) {
      setError("Failed to fetch books Please try again ");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    books,
    isLoading,
    error,
    fetchBooks,
    fetchFreeBooks,
    fetchRandomBooks
  };
};

 