import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSupBook } from "@/src/hooks/useSupBook";

type Book = {
  id: string;
  title: string;
  author: string;
  borrowCount: number;
};

const EditBook = () => {
  const router = useRouter();
  const { book } = useLocalSearchParams();
  const parsedBook = JSON.parse(book as string);
  console.log(parsedBook.id);
  // console.log("this is book id ", bookId);
  // const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId; // Convertit en string
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { updateBookService, loadBooks } = useSupBook();
  const handleSave = async () => {
    if (!bookTitle.trim()) {
      setError("Le titre ne peut pas être vide");
      return;
    }
    await updateBookService({
      ...parsedBook,
      author: bookAuthor,
      title: bookTitle,
    });
    // Sauvegarde simulée, ici vous pourriez appeler une API ou mettre à jour votre état global.
    Alert.alert("Succès", "Le titre a été modifié avec succès");
    router.back(); // Revenir à la page précédente après la modification
  };

  const handleBack = () => {
    router.back(); // Revenir à l'écran précédent sans sauvegarder
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f3f3" }}>
      {/* Bouton Retour */}
      <TouchableOpacity
        style={{
          backgroundColor: "#4A90E2",
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
        onPress={handleBack}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Retour</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: "#333",
          marginBottom: 16,
        }}
      >
        Modifier le Livre
      </Text>

      {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#333",
          marginBottom: 8,
        }}
      >
        Titre du livre
      </Text>
      <TextInput
        value={bookTitle} // Lié à l'état bookTitle
        onChangeText={setBookTitle}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />

      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#333",
          marginBottom: 8,
        }}
      >
        Auteur du livre
      </Text>
      <TextInput
        value={bookAuthor} // Lié à l'état bookAuthor
        onChangeText={setBookAuthor}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#4A90E2",
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleSave}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>
          Sauvegarder
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditBook;
