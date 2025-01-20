// LoanContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Définir un type Book pour le livre
interface Book {
  id: number;
  title: string;
}

// Créer le contexte avec le bon type
export const LoanContext = createContext<{
  loans: Book[];  // Type pour le tableau de livres
  addLoan: (book: Book) => void;
} | null>(null);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);  // Initialiser avec le type Book[]

  const addLoan = (book: Book) => {
    setLoans([...loans, book]);  // Ajouter un livre au tableau loans
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoanContext.Provider>
  );
};
