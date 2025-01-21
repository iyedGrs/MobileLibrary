import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSupBook } from "@/src/hooks/useSupBook"; // Importez le hook

const EditBook = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams();
  const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId; // Convertit en string

  // Utilisez le hook useSupBook
  const { fetchBookById, updateBook, isLoading, error } = useSupBook();

  // États pour gérer les données du livre
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");

  // Charge le livre au montage du composant
  useEffect(() => {
    if (bookIdString) {
      const loadBook = async () => {
        const book = await fetchBookById(bookIdString);
        if (book) {
          setBookTitle(book.title);
          setBookAuthor(book.author);
        } else {
          Alert.alert("Erreur", "Livre non trouvé");
        }
      };
      loadBook();
    }
  }, [bookIdString]);

  // Fonction pour sauvegarder les modifications du livre
  const handleSave = async () => {
    if (!bookTitle.trim()) {
      Alert.alert("Erreur", "Le titre ne peut pas être vide");
      return;
    }

    try {
      await updateBook(bookIdString, { title: bookTitle, author: bookAuthor });
      Alert.alert("Succès", "Le livre a été modifié avec succès");
      router.back(); // Revenir à la page précédente après la modification
    } catch (err) {
      console.error("Error updating book:", err);
      Alert.alert("Erreur", "Échec de la mise à jour du livre");
    }
  };

  // Fonction pour revenir à l'écran précédent
  const handleBack = () => {
    router.back();
  };

  // Affiche un indicateur de chargement si les données sont en cours de chargement
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f3f3" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={{ marginTop: 16, color: "#333" }}>Chargement du livre...</Text>
      </View>
    );
  }

  // Affiche un message d'erreur si une erreur survient
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f3f3" }}>
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f3f3" }}>
      {/* Bouton Retour */}
      <TouchableOpacity
        style={{ backgroundColor: "#4A90E2", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, marginBottom: 16 }}
        onPress={handleBack}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>Retour</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "700", color: "#333", marginBottom: 16 }}>
        Modifier le Livre
      </Text>

      {error && <Text style={{ color: "red", marginBottom: 16 }}>{error}</Text>}

      <Text style={{ fontSize: 16, fontWeight: "500", color: "#333", marginBottom: 8 }}>
        Titre du livre
      </Text>
      <TextInput
        value={bookTitle} // Lié à l'état bookTitle
        onChangeText={setBookTitle}
        style={{ backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: "#ccc" }}
      />

      <Text style={{ fontSize: 16, fontWeight: "500", color: "#333", marginBottom: 8 }}>
        Auteur du livre
      </Text>
      <TextInput
        value={bookAuthor} // Lié à l'état bookAuthor
        onChangeText={setBookAuthor}
        style={{ backgroundColor: "white", padding: 12, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: "#ccc" }}
      />

      <TouchableOpacity
        style={{ backgroundColor: "#4A90E2", paddingVertical: 12, borderRadius: 8, alignItems: "center" }}
        onPress={handleSave}
      >
        <Text style={{ color: "white", fontWeight: "500", fontSize: 16 }}>Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditBook;