import { useEffect, useState } from "react";
import {
  fetchBooks,
  addBookService,
  checkBookExists,
} from "../services/bookService";
import { Database } from "../constants/supabase";

type Book = Omit<
  Database["public"]["Tables"]["books"]["Row"],
  "id" | "created_at"
> & {
  id?: string;
  created_at?: string;
  category?: string | null;
};
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
  const addBook = async (book: Book) => {
    try {
      setIsLoading(true);
      await addBookService(book);
      setBooks((prevBooks) => [...prevBooks, book]);
      console.log("book added succefully");
    } catch (error) {
      setError("Failed to fetch books Please try again ");
    } finally {
      setIsLoading(false);
    }
  };
  const checkBookExistService = async (googleBooksId: string) => {
    try {
      const existBook = await checkBookExists(googleBooksId);
      return existBook;
    } catch (error) {
      console.error("Error checking book existence:", error);
      return false;
    }
  };

  return { books, loadBooks, isLoading, error, addBook, checkBookExistService };
};

// import { useState, useEffect, useCallback } from "react"
// import type { SupabaseClient } from "@supabase/supabase-js"

// type Book = {
//   google_books_id: string
//   // ... other book properties
// }

// const useSupBook = (supabase: SupabaseClient) => {
//   const [books, setBooks] = useState<Book[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<Error | null>(null)

//   const fetchBooks = useCallback(async () => {
//     setLoading(true)
//     setError(null)

//     try {
//       const { data, error } = await supabase.from("books").select("*")

//       if (error) {
//         throw error
//       }

//       setBooks(data)
//     } catch (err) {
//       setError(err as Error)
//     } finally {
//       setLoading(false)
//     }
//   }, [supabase])

//   useEffect(() => {
//     fetchBooks()
//   }, [fetchBooks])

//   const checkBookExists = async (googleBooksId: string) => {
//     const { data, error } = await supabase.from("books").select("id").eq("google_books_id", googleBooksId).single()

//     if (error) {
//       console.error("Error checking book existence:", error)
//       return false
//     }

//     return !!data
//   }

//   return {
//     books,
//     loading,
//     error,
//     fetchBooks,
//     checkBookExists,
//   }
// }

// export default useSupBook
