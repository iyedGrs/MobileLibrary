import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

// Dummy data pour les livres empruntés
const initialLoans = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel set in the Jazz Age that examines themes of wealth, class, and the American Dream.",
    borrowedDate: "2025-01-01",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian social science fiction novel and cautionary tale about the future of totalitarianism.",
    borrowedDate: "2025-01-05",
  },
  {
    id: "3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "A compelling account of the history of humanity, from the Stone Age to modern-day technological advancements.",
    borrowedDate: "2025-01-10",
  },
];

export default function LoansScreen() {
  const [loans, setLoans] = useState(initialLoans);

  // Fonction pour retourner un livre
  const handleReturnBook = (bookId: string) => {
    const updatedLoans = loans.filter((book) => book.id !== bookId);
    setLoans(updatedLoans);
    Alert.alert("Success", "Book returned successfully.");
  };

  // Fonction pour annuler un emprunt
  const handleCancelLoan = (bookId: string) => {
    const updatedLoans = loans.filter((book) => book.id !== bookId);
    setLoans(updatedLoans);
    Alert.alert("Success", "Book loan canceled.");
  };

  const renderLoan = ({ item }: any) => (
    <View style={styles.loanItem}>
      <View style={styles.loanInfo}>
        <Text style={styles.loanTitle}>{item.title}</Text>
        <Text style={styles.loanAuthor}>{item.author}</Text>
        <Text style={styles.loanDescription}>{item.description}</Text>
      </View>
      <Text style={styles.loanDate}>Borrowed on: {item.borrowedDate}</Text>

      {/* Bouton pour retourner un livre */}
      <TouchableOpacity
        style={styles.returnButton}
        onPress={() => handleReturnBook(item.id)}
      >
        <Text style={styles.returnButtonText}>Return</Text>
      </TouchableOpacity>

      {/* Bouton pour annuler l'emprunt */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancelLoan(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancel Loan</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Books You've Borrowed</Text>
      {loans.length === 0 ? (
        <Text>No books borrowed yet.</Text>
      ) : (
        <FlatList
          data={loans}
          renderItem={renderLoan}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loanItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  loanInfo: {
    marginBottom: 8,
  },
  loanTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loanAuthor: {
    fontSize: 14,
    color: "#555",
  },
  loanDescription: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  loanDate: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
  },
  returnButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 8,
  },
  returnButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
