// import React, { useEffect } from "react";
// import {
//   Text,
//   ActivityIndicator,
//   Alert,
//   Image,
//   Button,
//   View,
//   ScrollView,
// } from "react-native";
// import { useSupBook } from "@/src/hooks/useSupBook";
// import { useBooks } from "@/src/hooks/useBooks";
// import BookList from "@/src/components/BookList";

// const AddBook = () => {
//   const { addBook } = useSupBook();
//   const { fetchRandomBooks, books, error, isLoading } = useBooks();

//   useEffect(() => {
//     fetchRandomBooks(); // Charger les livres depuis l'API
//   }, []);

//   const handleAddBook = async (book: any) => {
//     // Transformation des données du livre pour correspondre au format attendu par Supabase
//     const bookToAdd = {
//       title: book.volumeInfo.title,
//       author: book.volumeInfo.authors || "Unknown",
//       description: book.volumeInfo.description || "No description available",
//       image_url: book.volumeInfo.imageLinks.smallThumbnail || "",
//       google_books_id: "",
//       published: book.volumeInfo.publishedDate || "Unknown",
//       category: book.volumeInfo.categories || "some-category", // Tu peux ajouter ici une logique pour la catégorie
//     };

//     try {
//       await addBook(bookToAdd); // Appeler le service pour ajouter le livre à Supabase
//       Alert.alert("Success", "Book added successfully!");
//     } catch (error) {
//       Alert.alert("Error", "Failed to add the book.");
//     }
//   };

//   if (isLoading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (error) {
//     return <Text>{error}</Text>;
//   }
//   console.log(books);
//   return (
//     <ScrollView contentContainerStyle={{ padding: 10 }}>
//       {books.map((book) => (
//         <View
//           key={book.id}
//           style={{
//             marginBottom: 20,
//             backgroundColor: "#fff",
//             padding: 10,
//             borderRadius: 8,
//             shadowColor: "#000",
//             shadowOffset: { width: 0, height: 1 },
//             shadowOpacity: 0.22,
//             shadowRadius: 2.22,
//             elevation: 3,
//           }}
//         >
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>
//             {book.volumeInfo.title}
//           </Text>
//           <Text style={{ fontSize: 14, color: "#555" }}>
//             {book.volumeInfo.authors || "no one"}
//           </Text>

//           {book.volumeInfo.imageLinks && (
//             <Image
//               source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }}
//               style={{ width: 100, height: 150, marginVertical: 10 }}
//             />
//           )}

//           <Button title="Add to Library" onPress={() => handleAddBook(book)} />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// export default AddBook;

import React, { useEffect, useState } from "react";
import {
  Text,
  ActivityIndicator,
  Alert,
  Image,
  Button,
  View,
  ScrollView,
} from "react-native";
import { useSupBook } from "@/src/hooks/useSupBook";
import { useBooks } from "@/src/hooks/useBooks";

const AddBook = () => {
  const { addBook, checkBookExistService } = useSupBook();
  const { fetchRandomBooks, books, error, isLoading } = useBooks();
  const [addedBooks, setAddedBooks] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchRandomBooks();
  }, []);

  const handleAddBook = async (book: any) => {
    const bookToAdd = {
      title: book.volumeInfo.title,
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
      console.log("book exist ", exists);
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
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      {books.map((book) => (
        <View
          key={book.id}
          style={{
            marginBottom: 20,
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {book.volumeInfo.title}
          </Text>
          <Text style={{ fontSize: 14, color: "#555" }}>
            {book.volumeInfo.authors || "no one"}
          </Text>

          {book.volumeInfo.imageLinks && (
            <Image
              source={{ uri: book.volumeInfo.imageLinks.smallThumbnail }}
              style={{ width: 100, height: 150, marginVertical: 10 }}
            />
          )}

          <Button
            title={
              addedBooks.has(book.id) ? "Added to Library" : "Add to Library"
            }
            onPress={() => handleAddBook(book)}
            disabled={addedBooks.has(book.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default AddBook;
