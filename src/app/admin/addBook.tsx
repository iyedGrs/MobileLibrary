import React, { useEffect } from "react";
import { View, Text, Button, Image, ScrollView, ActivityIndicator, Alert } from "react-native";
import { useSupBook } from "../hook/useSupBook";  
import { addBook } from "../services/bookService";  

const BookList = () => {
  const { books, isLoading, error, loadBooks } = useSupBook();

  useEffect(() => {
    loadBooks();  // Charger les livres depuis l'API
  }, []);

  const handleAddBook = async (book: any) => {
    // Transformation des données du livre pour correspondre au format attendu par Supabase
    const bookToAdd = {
      title: book.title,
      author: book.authors?.join(", ") || "Unknown",  // Si l'auteur est un tableau, on les joint
      description: book.description || "No description available",
      image_url: book.imageLinks?.thumbnail || "",
      google_books: book.infoLink || "",
      published: book.publishedDate || "Unknown",
      categorie: "some-category",  // Tu peux ajouter ici une logique pour la catégorie
    };

    try {
      await addBook(bookToAdd);  // Appeler le service pour ajouter le livre à Supabase
      Alert.alert("Success", "Book added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add the book.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {books.map((book) => (
        <View key={book.id} style={{ marginBottom: 20, backgroundColor: '#fff', padding: 10, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{book.title}</Text>
          <Text style={{ fontSize: 14, color: "#555" }}>{book.authors?.join(", ")}</Text>
          
          {book.imageLinks?.thumbnail && (
            <Image
              source={{ uri: book.imageLinks.thumbnail }}
              style={{ width: 100, height: 150, marginVertical: 10 }}
            />
          )}
          
          <Button title="Add to Library" onPress={() => handleAddBook(book)} />
        </View>
      ))}
    </ScrollView>
  );
};

export default BookList;
