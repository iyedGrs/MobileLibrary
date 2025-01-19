import { supabase } from '../supaBaseClient';

interface Book {
  id: string;
  title: string | null;
  author: string | null;
  description: string | null;
  image_url: string | null;
  google_books_id: string | null;
  created_at: string;
  published: string | null;
}

export const fetchBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*');

  if (error) throw error;
  return data || [];
};

export const addBook = async (book: Omit<Book, 'id' | 'created_at'>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .insert([book])
    .single();

  if (error) throw error;
  return data;
};