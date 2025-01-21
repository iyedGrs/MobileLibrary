// @ts-ignore
// @ts-nocheck
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LoanContext } from "../../../store/LoansContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Book } from "../../../store/LoansContext";

const Loans = () => {
  const context = useContext(LoanContext);
  if (!context) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const { loans, removeLoan, cancelLoan, loanStatus } = context;

  const cancelBorrow = (bookId: string) => {
    Alert.alert(
      "Annuler l'emprunt",
      "Êtes-vous sûr de vouloir annuler cet emprunt?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            cancelLoan(bookId);
            removeLoan(bookId);
          },
        },
      ]
    );
  };

  const returnBook = (bookId: number) => {
    Alert.alert(
      "Retourner le livre",
      "Êtes-vous sûr de vouloir retourner ce livre?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            removeLoan(bookId);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emprunts</Text>
      <FlatList
        data={loans}
        keyExtractor={(item: Book) => item.id.toString()}
        renderItem={({ item }: { item: Book }) => (
          <View style={styles.loanItem}>
            <Text style={styles.loanTitle}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              {loanStatus[item.id] === "accepted" && (
                <TouchableOpacity
                  style={[styles.button, styles.returnButton]}
                  onPress={() => returnBook(item.id)}
                >
                  <Icon name="undo" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Retourner</Text>
                </TouchableOpacity>
              )}
              {loanStatus[item.id] !== "accepted" && (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => cancelBorrow(item.id)}
                >
                  <Icon name="cancel" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
              )}
            </View>
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
    textAlign: "center",
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
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  returnButton: {
    backgroundColor: "#28a745",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
  },
});

export default Loans;
