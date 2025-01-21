import { useState } from "react";
import {
  fetchLoans,
  loanBook,
  rejectLoan,
  returnBook,
} from "../services/loanService"; // Assurez-vous d'importer vos fonctions de service

export const useLoans = (userId: string) => {
  const [loans, setLoans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("this is the user id", userId);
  // Fonction pour récupérer les prêts de l'utilisateur
  const fetchUserLoans = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchLoans(userId);
      setLoans(results);
    } catch (error) {
      setError("Failed to fetch loans. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour emprunter un livre
  const borrowBook = async (bookId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newLoan = await loanBook(userId, bookId);
      setLoans((prevLoans) => [...prevLoans, newLoan]); // Ajoute le nouveau prêt à la liste
    } catch (error) {
      setError("Failed to borrow the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour retourner un livre
  const returnUserBook = async (loanId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedLoan = await returnBook(loanId);
      setLoans(
        (prevLoans) =>
          prevLoans.map((loan) => (loan.id === loanId ? updatedLoan : loan)) // Met à jour le prêt retourné
      );
    } catch (error) {
      setError("Failed to return the book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  //******************************* */
  const cancelLoan = async (loanId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Mettez à jour le statut de "borrowed" à "available" pour ce livre
      const updatedLoan = await rejectLoan(loanId); // Fonction déjà définie dans `loanService.ts`
      setLoans(
        (prevLoans) => prevLoans.filter((loan) => loan.id !== loanId) // Retirer le prêt de la liste affichée
      );
    } catch (error) {
      setError("Failed to cancel the loan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  //***************************************************** */

  return {
    loans,
    isLoading,
    error,
    fetchUserLoans,
    borrowBook,
    returnUserBook,
  };
};
