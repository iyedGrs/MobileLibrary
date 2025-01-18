import { useState } from "react";
import { searchBooks } from "../services/googleBookService";

export const useBooks = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchBooks(query);
      console.log("tthis is hook books ", results);
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
  };
};
