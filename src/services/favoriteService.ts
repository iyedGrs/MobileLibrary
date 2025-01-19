import { supabase } from '../supaBaseClient';

interface Favorite {
  user_id: string;
  book_id: string;
}

export const addToFavorites = async (userId: string, bookId: string): Promise<Favorite> => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([{ user_id: userId, book_id: bookId }])
    .single();

  if (error) throw error;
  return data;
};

export const fetchUserFavorites = async (userId: string): Promise<Favorite[]> => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
};