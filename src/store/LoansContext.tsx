/*import React, { createContext, useState, ReactNode } from 'react';

// Définir le type Book
export interface Book {
  id: number;
  title: string;
  borrowed: boolean;
}

// Créer le contexte avec le bon type
export const LoanContext = createContext<{
  loans: Book[];
  addLoan: (book: Book) => void;
  removeLoan: (bookId: number) => void;
} | null>(null);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);

  const addLoan = (book: Book) => {
    setLoans((prevLoans) => [...prevLoans, book]);
  };

  const removeLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((book) => book.id !== bookId));
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan, removeLoan }}>
      {children}
    </LoanContext.Provider>
  );
};
*/
import React, { createContext, useState, ReactNode } from "react";

export type Book = {
  id: number;
  title: string;
  borrowed: boolean;
};

interface LoanContextType {
  loans: Book[];
  addLoan: (book: Book) => void;
  removeLoan: (bookId: number) => void;
  cancelLoan: (bookId: number) => void;
  isLoanCanceled: boolean;  // Nouvel état pour gérer si le prêt est annulé
  setIsLoanCanceled: (state: boolean) => void; // Fonction pour mettre à jour cet état
}

export const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);
  const [isLoanCanceled, setIsLoanCanceled] = useState(false); // État pour annulation

  const addLoan = (book: Book) => {
    setLoans((prevLoans) => [...prevLoans, book]);
  };

  const removeLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  const cancelLoan = (bookId: number) => {
    setIsLoanCanceled(true); // Mettez à jour l'état lorsque l'emprunt est annulé
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        addLoan,
        removeLoan,
        cancelLoan,
        isLoanCanceled,  // Passer l'état au contexte
        setIsLoanCanceled, // Passer la fonction
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};


