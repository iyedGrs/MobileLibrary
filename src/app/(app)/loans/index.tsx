// Loans.tsx
import React, { useContext } from 'react';
import { LoanContext } from '../../../store/LoansContext';

// Définir un type Book pour le livre
interface Book {
  id: number;
  title: string;
}

const Loans = () => {
  const context = useContext(LoanContext);

  // Vérifiez si le contexte est null avant d'accéder à 'loans'
  if (!context) {
    return <div>Loading...</div>;
  }

  const { loans } = context;

  return (
    <div>
      <h2>Loans</h2>
      {loans.map((loan: Book, index: number) => (
        <div key={index}>{loan.title}</div>
      ))}
    </div>
  );
};

export default Loans;
