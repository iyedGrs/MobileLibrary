import { supabase } from '../supaBaseClient';

interface Loan {
  id: string;
  user_id: string;
  book_id: string;
  loan_date: string;
  return_date: string | null;
}


export const fetchLoans = async (userId: string): Promise<Loan[]> => {
    const { data, error } = await supabase
      .from('loans')
      .select('*')
      .eq('user_id', userId);
  
    if (error) throw error;
    return data || [];
  };
  
export const loanBook = async (userId: string, bookId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from('loans')
    .insert([{ user_id: userId, book_id: bookId, loan_date: new Date().toISOString() }])
    .single();

  if (error) throw error;
  return data;
};

export const returnBook = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from('loans')
    .update({ return_date: new Date().toISOString() })
    .eq('id', loanId)
    .single();

  if (error) throw error;
  return data;
};