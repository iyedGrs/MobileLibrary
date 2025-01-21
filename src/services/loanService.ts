/*import { supabase } from "../supaBaseClient";

interface Loan {
  id: string;
  user_id: string;
  book_id: string;
  loan_date: string;
  return_date: string | null;
  approval: "pending" | "accepted" | "rejected"; // Ajout du champ status
}

// Récupérer toutes les demandes d'emprunt en attente
export const fetchPendingLoans = async (): Promise<Loan[]> => {
  const { data, error } = await supabase.from("loans").select("*");
  // .eq("approval", "pending");

  if (error) throw error;
  return data || [];
};

// Récupérer les prêts d'un utilisateur
export const fetchLoans = async (userId: string): Promise<Loan[]> => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  console.log("data", data);
  return data || [];
};

// Faire une demande d'emprunt (statut par défaut : pending)
export const requestLoan = async (
  userId: string,
  bookId: string
): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        loan_date: new Date().toISOString(),
        status: "pending",
      },
    ])
    .single();

  if (error) throw error;
  return data;
};

// Emprunter un livre (fonction supplémentaire pour la clarté)
export const loanBook = async (
  userId: string,
  bookId: string
): Promise<Loan> => {
  console.log("loan book triggered");
  const { data, error } = await supabase
    .from("loans")
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        loan_date: new Date().toISOString(),
        approval: false,
      },
    ])
    .single();
  console.log("error", error);
  if (error) throw error;
  console.log("data from service", data);
  return data;
};

// Accepter une demande d'emprunt
export const acceptLoan = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ status: "accepted" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};

// Refuser une demande d'emprunt
export const rejectLoan = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ status: "rejected" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};

// Retourner un livre
export const returnBook = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ return_date: new Date().toISOString() })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};*/
import { supabase } from "../supaBaseClient";

interface Loan {
  id: string;
  user_id: string;
  book_id: string;
  loan_date: string;
  return_date: string | null;
  approval: "pending" | "accepted" | "rejected" | "cancelled";
}

// Récupérer toutes les demandes d'emprunt en attente
export const fetchPendingLoans = async (): Promise<Loan[]> => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("approval", "pending");

  if (error) throw error;
  return data || [];
};

// Récupérer les prêts d'un utilisateur
export const fetchLoans = async (userId: string): Promise<Loan[]> => {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  console.log("data", data);
  return data || [];
};

// Faire une demande d'emprunt (statut par défaut : pending)
export const requestLoan = async (
  userId: string,
  bookId: string
): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        loan_date: new Date().toISOString(),
        approval: "pending",
      },
    ])
    .single();

  if (error) throw error;
  return data;
};

// Emprunter un livre (fonction supplémentaire pour la clarté)
export const loanBook = async (
  userId: string,
  bookId: string
): Promise<Loan> => {
  console.log("loan book triggered");
  const { data, error } = await supabase
    .from("loans")
    .insert([
      {
        user_id: userId,
        book_id: bookId,
        loan_date: new Date().toISOString(),
        approval: "pending",
      },
    ])
    .single();
  console.log("error", error);
  if (error) throw error;
  console.log("data from service", data);
  return data;
};

// Accepter une demande d'emprunt
export const acceptLoan = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ approval: "accepted" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};

// Refuser une demande d'emprunt
export const rejectLoan = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ approval: "rejected" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};

// Annuler une demande d'emprunt
export const cancelLoan = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ approval: "cancelled" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};

// Retourner un livre
export const returnBook = async (loanId: string): Promise<Loan> => {
  const { data, error } = await supabase
    .from("loans")
    .update({ return_date: new Date().toISOString(), approval: "returned" })
    .eq("id", loanId)
    .single();

  if (error) throw error;
  return data;
};
