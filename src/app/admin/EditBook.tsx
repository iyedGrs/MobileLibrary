import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type Book = {
  id: string;
  title: string;
  author: string;
  borrowCount: number;
};

const EditBook = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams();
  const bookIdString = Array.isArray(bookId) ? bookId[0] : bookId; // Convertit en string
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Liste simulée des livres (identique à celle de ManageBooks)
  const books: Book[] = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowCount: 5 },
    { id: "2", title: "1984", author: "George Orwell", borrowCount: 8 },
    { id: "3", title: "Sapiens", author: "Yuval Noah Harari", borrowCount: 3 },
  ];

  // Charger les données du livre sélectionné
  useEffect(() => {
    if (bookIdString) {
      console.log("Searching for book with ID:", bookIdString); // Affichez l'ID recherché
      const book = books.find((b) => b.id === bookIdString); // Recherche du livre par ID
      if (book) {
        console.log("Book found:", book); // Affichez le livre trouvé
        setBookTitle(book.title);
        setBookAuthor(book.author);
      } else {
        console.log("Book not found"); // Affichez si le livre n'est pas trouvé
        setError("Livre non trouvé");
      }
    }
  }, [bookIdString]);

  const handleSave = () => {
    if (!bookTitle.trim()) {
      setError("Le titre ne peut pas être vide");
      return;
    }

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