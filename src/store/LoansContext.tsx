/*import React, { createContext, useState, ReactNode } from "react";

export type Book = {
  id: number;
  title: string;
  isBorrowed: boolean;
  borrowDate?: string;
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
*/
import React, { createContext, useState, ReactNode } from "react";
import { useLoanRequests } from "../hooks/useLoanRequests";
import { useLoans } from "../hooks/useLoans";

export type Book = {
  id: number;
  title: string;
  isBorrowed: boolean;
  borrowDate?: string;
  returnDate?: string;
};

export interface LoanContextType {
  loans: Book[];
  loanStatus: string; // Ajoutez ceci pour suivre le statut du prêt
  addLoan: (book: Book) => void;
  removeLoan: (bookId: number) => void;
  cancelLoan: (bookId: number) => void;
  updateLoan: (bookId: number, updatedInfo: Partial<Book>) => void;
}

export const LoanContext = React.createContext<LoanContextType | undefined>(
  undefined
);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);
  const loanStatus = "pending"; // Ajoutez ceci pour suivre le statut du prêt

  const addLoan = (book: Book) => {
    if (loans.some((loan) => loan.id === book.id && loan.isBorrowed)) {
      console.warn("Book is already borrowed.");
      return;
    }
    setLoans((prevLoans) => [
      ...prevLoans,
      { ...book, isBorrowed: true, borrowDate: new Date().toISOString() },
    ]);
  };

  const removeLoan = (bookId: number) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  const cancelLoan = (bookId: number) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === bookId ? { ...loan, isBorrowed: false } : loan
      )
    );
  };

  const updateLoan = (bookId: number, updatedInfo: Partial<Book>) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === bookId ? { ...loan, ...updatedInfo } : loan
      )
    );
  };

  return (
    <LoanContext.Provider
      value={{
        loans,
        loanStatus,
        addLoan,
        removeLoan,
        cancelLoan,
        updateLoan,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};
