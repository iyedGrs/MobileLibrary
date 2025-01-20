// books.tsx
import React, { useContext } from 'react';
import { LoanContext } from '../../../store/LoansContext';

const Books = () => {
  const context = useContext(LoanContext);

  // Vérifiez si le contexte est null avant d'accéder à 'addLoan'
  if (!context) {
    return <div>Loading...</div>;
  }

  const { addLoan } = context;

  const books = [
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' },
    // D'autres livres
  ];

  const handleBorrow = (book: { id: number; title: string }) => {
    addLoan(book);  // Ajouter le livre emprunté à l'état
  };

  return (
    <div>
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <span>{book.title}</span>
          <button onClick={() => handleBorrow(book)}>Borrow</button>
        </div>
      ))}
    </div>
  );
};

export default Books;