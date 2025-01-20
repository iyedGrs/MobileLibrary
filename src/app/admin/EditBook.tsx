import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

const EditBook = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Supposons qu'on récupère les détails du livre via un appel API ou une source d'état globale.
    const book = {
      id: bookId,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      borrowCount: 5,
    };
    setBookTitle(book.title);
  }, [bookId]);

  const handleSave = () => {
    if (!bookTitle.trim()) {
      setError("Le titre ne peut pas être vide");
      return;
    }

    // Sauvegarder ici, mettre à jour l'état global ou appeler l'API
    Alert.alert("Succès", "Le titre a été modifié avec succès");
    router.back(); // Rediriger à la page précédente après la modification
  };

  const handleBack = () => {
    router.back(); // Revenir à l'écran précédent sans sauvegarder
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Bouton Retour */}
      <TouchableOpacity
        className="bg-gray-300 py-2 px-4 rounded-lg mb-4"
        onPress={handleBack}
      >
        <Text className="text-gray-800 font-medium">Retour</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-semibold text-gray-800 mb-4">
        Modifier le Livre
      </Text>
      {error && <Text className="text-red-500">{error}</Text>}
      <Text className="text-lg font-medium mb-2">Titre du livre</Text>
      <TextInput
        value={bookTitle}
        onChangeText={setBookTitle}
        className="border p-3 rounded-lg mb-4"
      />
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-lg"
        onPress={handleSave}
      >
        <Text className="text-white font-medium">Sauvegarder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditBook;