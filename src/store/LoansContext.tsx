// LoanContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export const LoanContext = createContext<any>(null);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState([]);

  const addLoan = (book: any) => {
    console.log('Adding loan:', book);  // Log pour vérifier si la fonction est appelée
    setLoans([...loans, book]);
  };

  return (
    <LoanContext.Provider value={{ loans, addLoan }}>
      {children}
    </LoanContext.Provider>
  );
};
