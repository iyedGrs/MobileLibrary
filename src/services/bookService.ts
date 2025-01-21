import { supabase } from "../supaBaseClient";

interface Book {
  id: string;
  title: string | null;
  author: string | null;
  description: string | null;
  image_url: string | null;
  google_books_id: string | null;
  created_at: string;
  published: string | null;
  category: string | null;
}

export const fetchBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase.from("books").select("*");

  if (error) throw error;
  return data || [];
};

export const addBookService = async (
  book: Omit<Book, "id" | "created_at">
): Promise<Book> => {
  const { data, error } = await supabase.from("books").insert([book]).single();

  if (error) throw error;
  return data;
};

export const checkBookExists = async (
  googleBooksId: string
): Promise<boolean> => {
  const { data, error } = await supabase
    .from("books")
    .select("id")
    .eq("google_books_id", googleBooksId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking book existence:", error);
    return false;
  }

  return !!data;
};
