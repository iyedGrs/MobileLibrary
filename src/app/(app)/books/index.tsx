import React, { useState, useContext, useCallback, useEffect } from "react";
import { LoanContext } from "../../../store/LoansContext";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSupBook } from "@/src/hooks/useSupBook";

// Définir un type Book pour le livre
interface Book {
  id: number;
  title: string;
  isBorrowed: boolean;
}

const Books = () => {
  const context = useContext(LoanContext);

  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { addLoan, loans } = context;
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const { loadBooks, books, error, isLoading } = useSupBook();

  const toggleFavorite = (bookId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]
    );
  };

  const handleBorrow = (book: Book) => {
    if (!book.isBorrowed) {
      addLoan({ ...book, isBorrowed: true });
      alert(`You borrowed "${book.title}"`);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === "All";
    const matchesSearch =
      (book.title &&
        book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author &&
        book.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={
        displayFavorites
          ? books.filter((book) => favorites.includes(book.id))
          : filteredBooks
      }
      renderItem={({ item }) => {
        const book: Book = {
          id: parseInt(item.id),
          title: item.title || "Untitled",
          isBorrowed: loans.some((loan) => loan.id === parseInt(item.id)),
        };

        return (
          <View style={styles.bookItem}>
            <Image
              source={{ uri: item.image_url || "default_image_url" }}
              style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={styles.bookDescription}>{item.description}</Text>
            <Text style={styles.bookDetails}>Published: {item.published}</Text>

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={styles.favoriteButton}
              >
                <Ionicons
                  name={favorites.includes(item.id) ? "heart" : "heart-outline"}
                  size={24}
                  color={favorites.includes(item.id) ? "red" : "#888"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleBorrow(book)}
                style={[
                  styles.borrowButton,
                  book.isBorrowed ? styles.borrowedButton : null,
                ]}
                disabled={book.isBorrowed}
              >
                <Text style={styles.borrowButtonText}>
                  {book.isBorrowed ? "Already Borrowed" : "Borrow"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setDisplayFavorites(false)}
              style={[
                styles.categoryButton,
                !displayFavorites ? styles.activeButton : null,
              ]}
            >
              <Text style={styles.buttonText}>All Books</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDisplayFavorites(true)}
              style={[
                styles.categoryButton,
                displayFavorites ? styles.activeButton : null,
              ]}
            >
              <Text style={styles.buttonText}>Favorites</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput
              placeholder="Search books..."
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.categoryFilterContainer}>
            {[
              "All",
              "Fiction",
              "Non-fiction",
              "Science",
              "History",
              "Technology",
              "Business",
              "Psychology",
              "Cooking",
              "Philosophy",
            ].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category ? styles.activeButton : null,
                ]}
              >
                <Text style={styles.buttonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      }
      ListFooterComponent={<View style={{ height: 20 }} />}
    />
  );
};

// Styles améliorés
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  categoryButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  activeButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  buttonText: {
    color: "#333",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  categoryFilterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  bookItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
  },
  bookImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 8,
  },
  bookDetails: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  favoriteButton: {
    marginRight: 16,
  },
  borrowButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  borrowedButton: {
    backgroundColor: "#28a745",
  },
  borrowButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Books;
