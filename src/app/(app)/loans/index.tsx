// @ts-ignore
// @ts-nocheck
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LoanContext } from "../../../store/LoansContext";
import { Book } from "../../../store/LoansContext";
import { MaterialIcons } from "@expo/vector-icons"; // Pour les icônes

const Loans = () => {
  const { loans, addLoan, removeLoan, cancelLoan, updateLoan, loanStatus } =
    useContext(LoanContext);
  console.log("these are loans ", JSON.stringify(loans, null, 2));

  const [newBookTitle, setNewBookTitle] = useState<string>("");

  // Fonction pour gérer l'ajout d'un livre
  const handleAddLoan = () => {
    if (!newBookTitle.trim()) return;

    const newBook: Book = {
      id: `${Date.now()}`,
      title: newBookTitle,
      isBorrowed: false,
      status: "pending", // Statut par défaut "pending" lorsqu'il n'est pas encore accepté
    };

    addLoan(newBook);
    setNewBookTitle(""); // Réinitialiser le champ de texte
  };

  // Fonction pour gérer l'annulation d'un livre emprunté
  const handleCancelLoan = (bookId: string) => {
    cancelLoan(bookId);
  };

  // Fonction pour mettre à jour un emprunt
  const handleUpdateLoan = (bookId: string) => {
    const updatedInfo: Partial<Book> = {
      returnDate: new Date().toISOString(),
      status: "Rendu", // Mettre à jour le statut lorsque le livre est retourné
    };
    updateLoan(bookId, updatedInfo);
  };

  // Fonction pour gérer la suppression d'un livre
  const handleRemoveLoan = (bookId: string) => {
    removeLoan(bookId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Emprunts</Text>

      {/* Liste des livres empruntés */}
      <FlatList
        data={loans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.loanItem}>
            <Text
              style={[
                styles.loanText,
                item.isBorrowed ? styles.borrowed : styles.notBorrowed,
              ]}
            >
              {item.title}
            </Text>

            <Text style={styles.loanStatus}>Statut: Pending ...</Text>

            <View style={styles.buttonsContainer}>
              {loanStatus[item.id] === "accepted" && (
                <TouchableOpacity
                  style={[styles.button, styles.returnButton]}
                  onPress={() => handleUpdateLoan(item.id)}
                >
                  <MaterialIcons name="undo" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Retourner</Text>
                </TouchableOpacity>
              )}
              {!item.isBorrowed ? (
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => handleCancelLoan(item.id)}
                >
                  <MaterialIcons name="cancel" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleRemoveLoan(item.id)}
                >
                  <MaterialIcons name="delete" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Supprimer</Text>
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
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  loanItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  loanText: {
    fontSize: 18,
    marginBottom: 5,
  },
  loanStatus: {
    fontSize: 14,
    color: "#6c757d", // Gris pour le texte de statut
    marginBottom: 15,
  },
  borrowed: {
    color: "#28a745", // Vert pour les livres empruntés
  },
  notBorrowed: {
    color: "#dc3545", // Rouge pour les livres non empruntés
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: "45%",
  },
  returnButton: {
    backgroundColor: "#28a745", // Vert
  },
  cancelButton: {
    backgroundColor: "#f5c54c", // Jaune
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Rouge
  },
  buttonText: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "bold",
  },
});

export default Loans;
