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

// Définir l'interface Book
export interface Book {
  id: number;
  title: string;
  author: string;
  borrowed: boolean;
}

// Définir le type de contexte
interface LoanContextType {
  loans: Book[];
  addLoan: (book: Book) => void;
  removeLoan: (bookId: number) => void;
  cancelLoan: () => void;  // Nouvelle fonction pour annuler l'emprunt
  isLoanCancelled: boolean;  // Indicateur d'annulation
}

// Définir les props du provider
interface LoanProviderProps {
  children: ReactNode;
}

export const LoanContext = createContext<LoanContextType | undefined>(undefined);

// Provider
export const LoanProvider: React.FC<LoanProviderProps> = ({ children }) => {
  const [loans, setLoans] = useState<Book[]>([]);
  const [isLoanCancelled, setIsLoanCancelled] = useState<boolean>(false);

  const addLoan = (book: Book) => {
    setLoans((prevLoans) => [...prevLoans, book]);
  };

  const removeLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  const cancelLoan = () => {
    setIsLoanCancelled(true); // Marquer l'annulation
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan, removeLoan, cancelLoan, isLoanCancelled }}>
      {children}
    </LoanContext.Provider>
  );
};

