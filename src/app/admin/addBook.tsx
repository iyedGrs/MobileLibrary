import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  Alert,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSupBook } from "@/src/hooks/useSupBook";
import { useBooks } from "@/src/hooks/useBooks";
import { MaterialIcons } from "@expo/vector-icons"; // Assuming you have expo vector icons installed

const AddBook: React.FC = () => {
  const { addBook, checkBookExistService } = useSupBook();
  const { fetchRandomBooks, books, error, isLoading } = useBooks();
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const handleAddBook = async (book: any) => {
    const bookToAdd = {
      title: book.volumeInfo.title || "No title available",
      author: book.volumeInfo.authors
        ? book.volumeInfo.authors.join(", ")
        : "Unknown",
      description: book.volumeInfo.description || "No description available",
      image_url: book.volumeInfo.imageLinks?.smallThumbnail || "",
      google_books_id: book.id,
      published: book.volumeInfo.publishedDate || "Unknown",
      category: book.volumeInfo.categories
        ? book.volumeInfo.categories[0]
        : "Uncategorized",
    };

    try {
      const exists = await checkBookExistService(book.id);
      if (exists) {
        Alert.alert("Info", "This book is already in your library.");
        return;
      }
      await addBook(bookToAdd);
      Alert.alert("Success", "Book added successfully!");
      setAddedBooks((prev) => new Set(prev).add(book.id));
    } catch (error) {
      console.error("Error adding book:", error);
      Alert.alert("Error", "Failed to add the book.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#6D28D9" />;
  }

  if (error) {
    return (
      <Text className="text-center mt-5 text-red-500">Error: {error}</Text>
    );
  }

  return (
    <ScrollView className="p-4 bg-gray-50">
      {books.map((book) => (
        <View
          key={book.id}
          className="bg-white rounded-lg shadow-sm p-4 mb-4 flex-row items-center"
        >
          {book.volumeInfo.imageLinks?.smallThumbnail && (
            <Image
              source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }}
              className="w-20 h-28 rounded-lg mr-4"
            />
          )}

          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">
              {book.volumeInfo.title || "No title available"}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown Author"}
            </Text>
          </View>

          <TouchableOpacity
            className={`flex-row items-center justify-center px-3 py-2 rounded-lg ${
              addedBooks.has(book.id) ? "bg-green-500" : "bg-blue-600"
            }`}
            onPress={() => handleAddBook(book)}
            disabled={addedBooks.has(book.id)}
          >
            <MaterialIcons
              name={addedBooks.has(book.id) ? "check" : "add"}
              size={20}
              color="#fff"
            />
            <Text className="text-white font-bold ml-2">
              {addedBooks.has(book.id) ? "Added" : "Add to Library"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default AddBook;
