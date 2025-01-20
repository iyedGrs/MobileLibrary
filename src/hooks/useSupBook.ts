import { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookService";
import { Database } from "../constants/supabase";

type Book = Database["public"]["Tables"]["books"]["Row"];

export const useSupBook = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const data = await fetchBooks();
      if (error) {
        throw error;
      }
      setBooks(data);
    } catch (error) {
      setError("Failed to fetch books Please try again ");
    } finally {
      setIsLoading(false);
    }
    // const data = await fetchBooks();
    // setBooks(data);
  };

  return { books, loadBooks, isLoading, error };
};
