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

/*import React, { createContext, useState, ReactNode } from "react";
import { useLoanRequests } from "../hooks/useLoanRequests";
import { useLoans } from "../hooks/useLoans";

export type Book = {
  id: string;
  title: string;
  isBorrowed: boolean;
  borrowDate?: string;
  returnDate?: string;
};

export interface LoanContextType {
  loans: Book[];
  loanStatus: string; // Ajoutez ceci pour suivre le statut du prêt
  addLoan: (book: Book) => void;
  removeLoan: (bookId: string) => void;
  cancelLoan: (bookId: string) => void;
  updateLoan: (bookId: string, updatedInfo: Partial<Book>) => void;
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

  const removeLoan = (bookId: string) => {
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  const cancelLoan = (bookId: string) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === bookId ? { ...loan, isBorrowed: false } : loan
      )
    );
  };

  const updateLoan = (bookId: string, updatedInfo: Partial<Book>) => {
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
*/
import React, { createContext, useState, ReactNode } from "react";
import { useSupBook } from "../hooks/useSupBook";

export type Book = {
  id: string;
  title: string;
  isBorrowed: boolean;
  borrowDate?: string;
  returnDate?: string;
  cancelled?: boolean; // Ajout du champ "cancelled"
  status?: string; // Ajout du champ "status"
};

export interface LoanContextType {
  loans: Book[];
  loanStatus: string;
  addLoan: (book: Book) => void;
  removeLoan: (bookId: string) => void;
  cancelLoan: (bookId: string) => void;
  updateLoan: (bookId: string, updatedInfo: Partial<Book>) => void;
}

export const LoanContext = React.createContext<LoanContextType | undefined>(
  undefined
);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Book[]>([]);
  const loanStatus = "pending"; // Vous pouvez remplacer cela selon le besoin
  const { deleteBookService } = useSupBook();
  // Fonction pour ajouter un emprunt
  const addLoan = (book: Book) => {
    if (
      loans.some(
        (loan) => loan.id === book.id && (loan.isBorrowed || loan.cancelled)
      )
    ) {
      console.warn("Book is already borrowed or cancelled.");
      return;
    }
    setLoans((prevLoans) => [
      ...prevLoans,
      { ...book, isBorrowed: true, borrowDate: new Date().toISOString() },
    ]);
  };

  // Fonction pour supprimer un emprunt
  const removeLoan = (bookId: string) => {
    deleteBookService(bookId);
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== bookId));
  };

  // Fonction pour annuler un emprunt
  const cancelLoan = (bookId: string) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === bookId
          ? loan.isBorrowed && !loan.cancelled
            ? {
                ...loan,
                isBorrowed: false,
                cancelled: true,
                returnDate: new Date().toISOString(),
              }
            : loan // Si déjà annulé ou non emprunté, ne rien faire
          : loan
      )
    );
  };

  // Fonction pour mettre à jour un emprunt
  const updateLoan = (bookId: string, updatedInfo: Partial<Book>) => {
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
