import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

type Book = {
  id: string;
  title: string;
  author: string;
  borrowCount: number;
};

const ManageBooks = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);

        const dummyBooks: Book[] = [
          { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", borrowCount: 5 },
          { id: "2", title: "1984", author: "George Orwell", borrowCount: 8 },
          { id: "3", title: "Sapiens", author: "Yuval Noah Harari", borrowCount: 3 },
        ];
        setBooks(dummyBooks);
        setError(null);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (book: Book) => {
    router.push(`/editBook/${book.id}`); // Rediriger vers une page d'édition
  };

  const handleDelete = (bookId: string) => {
    Alert.alert(
      "Supprimer le livre",
      "Êtes-vous sûr de vouloir supprimer ce livre ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: () => {
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book.id !== bookId)
            );
            alert("Livre supprimé avec succès");
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
      <Text className="text-sm text-gray-600 mt-2">
        Auteur : {item.author}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        Emprunts : {item.borrowCount}
      </Text>
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-blue-500 py-2 px-4 rounded-lg"
          onPress={() => handleEdit(item)}
        >
          <Text className="text-white font-medium">Modifier</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 py-2 px-4 rounded-lg"
          onPress={() => handleDelete(item.id)}
        >
          <Text className="text-white font-medium">Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text className="mt-4 text-gray-700">Chargement des livres...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Gérer les Livres
      </Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default ManageBooks;
