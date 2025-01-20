import React, { createContext, useState, ReactNode } from "react";

export type Book = {
  id: number;
  title: string;
  isBorrowed: boolean;
};

interface LoanContextType {
  loans: Book[];
  addLoan: (book: Book) => void;
  removeLoan: (bookId: number) => void;
  cancelLoan: (bookId: number) => void;
}

export const LoanContext = createContext<LoanContextType | undefined>(
  undefined
);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);

  const addLoan = (book: Book) => {
    setLoans((prevLoans) => [...prevLoans, { ...book, isBorrowed: true }]);
  };

  const removeLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  const cancelLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        addLoan,
        removeLoan,
        cancelLoan,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
