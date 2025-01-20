// App.tsx
import React from 'react';
import { LoanProvider } from '../store/LoansContext';  // Vérifiez que le chemin d'importation est correct
import Books from '../app/(app)/books';  // Vérifiez le chemin
import Loans from '../app/(app)/loans';  // Vérifiez le chemin

const App = () => {
  return (
    <LoanProvider>
      <Books />
      <Loans />
    </LoanProvider>
  );
};

export default App;
