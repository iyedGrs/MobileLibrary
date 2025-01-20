import React, { useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { LoanContext } from "../../../store/LoansContext";

// Define a type Book for the book
interface Book {
  id: number;
  title: string;
}

const Loans = () => {
  const context = useContext(LoanContext);

  // Check if the context is null before accessing 'loans'
  if (!context) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const { loans } = context;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loans</Text>
      <FlatList
        data={loans}
        keyExtractor={(item: Book) => item.id.toString()}
        renderItem={({ item }: { item: Book }) => (
          <View style={styles.loanItem}>
            <Text style={styles.loanTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  loanItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loanTitle: {
    fontSize: 18,
  },
});

export default Loans;
