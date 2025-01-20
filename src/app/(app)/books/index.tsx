import React, { useContext } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { LoanContext } from "../../../store/LoansContext";

const Books = () => {
  const context = useContext(LoanContext);

  // Vérifiez si le contexte est null avant d'accéder à 'addLoan'
  if (!context) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const { addLoan } = context;

  const books = [
    { id: 1, title: "Book One" },
    { id: 2, title: "Book Two" },
    // D'autres livres
  ];

  const handleBorrow = (book: { id: number; title: string }) => {
    addLoan(book); // Ajouter le livre emprunté à l'état
  };

  return (
    <View>
      <Text>Books</Text>
      {books.map((book) => (
        <View key={book.id} style={{ marginVertical: 10 }}>
          <Text>{book.title}</Text>
          <Button title="Borrow" onPress={() => handleBorrow(book)} />
        </View>
      ))}
    </View>
  );
};

export default Books;
