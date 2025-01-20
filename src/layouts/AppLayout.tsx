
// App.tsx
import React from 'react';
import { LoanProvider } from '../store/LoansContext';
import Books from '../app/(app)/books';
import Loans from '../app/(app)/loans';

const App = () => {
  return (
    <LoanProvider>
      <Books />
      <Loans />
    </LoanProvider>
  );
};

export default App;
