import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for a loan
interface Loan {
  id: string;
  // Add other properties of a loan as needed
}

// Define the context type
interface LoansContextType {
  loans: Loan[];
  addLoan: (book: Loan) => void;
  removeLoan: (bookId: string) => void;
}

// Create the context with the defined type
const LoansContext = createContext<LoansContextType | undefined>(undefined);

export const LoansProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (book: Loan) => {
    setLoans((prevLoans) => [...prevLoans, book]);
  };

  const removeLoan = (bookId: string) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  return (
    <LoansContext.Provider value={{ loans, addLoan, removeLoan }}>
      {children}
    </LoansContext.Provider>
  );
};

export const useLoans = () => {
  const context = useContext(LoansContext);
  if (context === undefined) {
    throw new Error("useLoans must be used within a LoansProvider");
  }
  return context;
};
