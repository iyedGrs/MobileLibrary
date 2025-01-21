/*import React, { useState, useContext, useCallback, useEffect } from "react";
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
  StyleSheet,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSupBook } from "@/src/hooks/useSupBook";
import { Calendar } from "react-native-calendars"; // Import du calendrier

interface Book {
  id: number;
  title: string;
  author?: string;
  description?: string;
  published?: string;
  isBorrowed: boolean;
  borrowDate?: string; // Nouvelle propriété pour la date d'emprunt
  image_url?: string;
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
  const [selectedDate, setSelectedDate] = useState<string>(""); // Variable pour stocker la date
  const [showCalendar, setShowCalendar] = useState<boolean>(false); // État pour afficher/masquer le calendrier
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // Add this state
  const { loadBooks, books, error, isLoading } = useSupBook();

  const toggleFavorite = (bookId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]
    );
  };

  const handleBorrow = (book: Book) => {
    setSelectedBook(book); // Store the selected book
    setShowCalendar(true); // Show the calendar
  };

  const handleDateSelection = (date: string) => {
    if (selectedBook) {
      addLoan({
        ...selectedBook,
        isBorrowed: true,
        borrowDate: date,
      });
      alert(`You borrowed "${selectedBook.title}" on ${date}`);
      setSelectedBook(null); // Reset selected book
    }
    setSelectedDate(date);
    setShowCalendar(false);
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
    <>
      <FlatList
        style={styles.container}
        data={
          displayFavorites
            ? books.filter(
                (book) => book.id && favorites.includes(book.id.toString())
              )
            : filteredBooks
        }
        renderItem={({ item }) => {
          const book: Book = {
            id: Number.parseInt(item.id ?? "0"),
            title: item.title || "Untitled",
            author: item.author || "Unknown",
            description: item.description || "No description available",
            published: item.published || "Unknown",
            isBorrowed: loans.some(
              (loan) => loan.id === Number.parseInt(item.id ?? "0")
            ),
            image_url: item.image_url || "default_image_url",
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
              <Text style={styles.bookDetails}>
                Published: {item.published}
              </Text>

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPress={() => item.id && toggleFavorite(item.id.toString())}
                  style={styles.favoriteButton}
                >
                  <Ionicons
                    name={
                      favorites.includes((item.id ?? "").toString())
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={
                      favorites.includes((item.id ?? "").toString())
                        ? "red"
                        : "#888"
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBorrow(book)} // Fixed the onPress handler
                  style={[
                    styles.borrowButton,
                    book.isBorrowed ? styles.borrowedButton : null,
                  ]}
                  disabled={book.isBorrowed}
                >
                  <Text style={styles.borrowButtonText}>
                    {book.isBorrowed ? "reserved" : "Borrow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => (item.id ?? "0").toString()}
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

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowCalendar(false);
          setSelectedBook(null); // Reset selected book when closing modal
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                handleDateSelection(day.dateString);
              }} // Gérer la sélection de la date
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "#007BFF" },
              }}
              minDate={new Date().toISOString().split("T")[0]} // Only allow future dates
              theme={{
                selectedDayBackgroundColor: "#007BFF",
                todayTextColor: "#007BFF",
                arrowColor: "#007BFF",
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowCalendar(false);
                setSelectedBook(null);
              }}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
    elevation: 2,
    shadowColor: "#000",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    maxHeight: 400,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default Books;*/
import React, { useState, useContext, useCallback, useEffect } from "react";
import { LoanContext } from "@/src/store/LoansContext";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSupBook } from "@/src/hooks/useSupBook";
import { useLoans } from "../../../hooks/useLoans"; // Import de useLoans
import { Calendar } from "react-native-calendars"; // Import du calendrier
import { useUser } from "@clerk/clerk-react";
interface Book {
  id: number;
  title: string;
  author?: string;
  description?: string;
  published?: string;
  isBorrowed: boolean;
  borrowDate?: string;
  image_url?: string;
}

const Books = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { borrowBook } = useLoans(userId || ""); // Use the Clerk user ID

  const context = useContext(LoanContext);

  if (!context) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loanStatus, setLoanStatus] = useState<{ [key: number]: string }>({});
  const { addLoan, loans } = context;

  const onRefresh = () => {
    setRefreshing(true);
    loadBooks().then(() => setRefreshing(false)); // Assuming loadBooks returns a Promise
  };
  const { loadBooks, books, error, isLoading } = useSupBook();

  const toggleFavorite = (bookId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]
    );
  };

  const handleBorrow = async (book: Book) => {
    setLoanStatus((prev) => ({ ...prev, [book.id]: "pending" })); // L'emprunt est en cours
    setSelectedBook(book);
    setShowCalendar(true);
  };

  const handleDateSelection = async (date: string) => {
    if (selectedBook) {
      try {
        borrowBook(selectedBook.id.toString());
        await borrowBook(selectedBook.id.toString());
        addLoan({
          ...selectedBook,
          isBorrowed: true,
          borrowDate: date,
        });
        setLoanStatus((prev) => ({ ...prev, [selectedBook.id]: "accepted" })); // L'emprunt est accepté
        alert(`You borrowed "${selectedBook.title}" on ${date}`);
        setSelectedBook(null);
      } catch (error) {
        alert("Failed to borrow the book. Please try again.");
      }
    }
    setSelectedDate(date);
    setShowCalendar(false);
  };
  /*const handleDateSelection = async (date: string) => {
    if (selectedBook) {
      try {
        await borrowBook(selectedBook.id.toString());
        addLoan({
          ...selectedBook,
          isBorrowed: true,
          borrowDate: date,
        });
        alert(`You borrowed "${selectedBook.title}" on ${date}`);
        setSelectedBook(null);
      } catch (error) {
        alert("Failed to borrow the book. Please try again.");
      }
    }
    setSelectedDate(date);
    setShowCalendar(false);
  };*/

  useEffect(() => {
    loadBooks();
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
    <>
      <FlatList
        style={styles.container}
        data={
          displayFavorites
            ? books.filter(
                (book) => book.id && favorites.includes(book.id.toString())
              )
            : filteredBooks
        }
        renderItem={({ item }) => {
          const book: Book = {
            id: Number.parseInt(item.id ?? "0"),
            title: item.title || "Untitled",
            author: item.author || "Unknown",
            description: item.description || "No description available",
            published: item.published || "Unknown",
            isBorrowed: loans.some(
              (loan) => loan.id === Number.parseInt(item.id ?? "0")
            ),
            image_url: item.image_url || "default_image_url",
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
              <Text style={styles.bookDetails}>
                Published: {item.published}
              </Text>

              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPress={() => item.id && toggleFavorite(item.id.toString())}
                  style={styles.favoriteButton}
                >
                  <Ionicons
                    name={
                      favorites.includes((item.id ?? "").toString())
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    color={
                      favorites.includes((item.id ?? "").toString())
                        ? "red"
                        : "#888"
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleBorrow(book)} // Fixed the onPress handler
                  style={[
                    styles.borrowButton,
                    book.isBorrowed ? styles.borrowedButton : null,
                  ]}
                  disabled={book.isBorrowed}
                >
                  <Text style={styles.borrowButtonText}>
                    {book.isBorrowed ? "reserved" : "Borrow"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => (item.id ?? "0").toString()}
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

      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowCalendar(false);
          setSelectedBook(null); // Reset selected book when closing modal
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={(day) => {
                handleDateSelection(day.dateString);
              }} // Gérer la sélection de la date
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "#007BFF" },
              }}
              minDate={new Date().toISOString().split("T")[0]} // Only allow future dates
              theme={{
                selectedDayBackgroundColor: "#007BFF",
                todayTextColor: "#007BFF",
                arrowColor: "#007BFF",
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowCalendar(false);
                setSelectedBook(null);
              }}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

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
    elevation: 2,
    shadowColor: "#000",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    width: "80%",
    maxHeight: 400,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default Books;
