/*import React, { useContext } from 'react';
import { LoanContext } from '../../../store/LoansContext';
import { View, Text, TouchableOpacity } from 'react-native';

// Définir un type Book pour le livre
interface Book {
  id: number;
  title: string;
}

const Books = () => {
  const context = useContext(LoanContext);

  // Vérifiez si le contexte est null avant d'accéder à 'addLoan'
  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { addLoan } = context;

  // Exemple de livres disponibles
  const books: Book[] = [
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' },
    // D'autres livres
  ];

  const handleBorrow = (book: Book) => {
    addLoan(book);  // Ajouter le livre emprunté à l'état
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Books</Text>
      {books.map((book) => (
        <View key={book.id} style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 18 }}>{book.title}</Text>
          <TouchableOpacity
            onPress={() => handleBorrow(book)}
            style={{
              marginTop: 8,
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: '#007BFF',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Borrow</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Books;**************************/
/*
import React, { useState, useContext } from "react";
import { LoanContext } from "../../../store/LoansContext";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  isAvailable: boolean;
  image: string;
}

const Books = () => {
  const { addLoan } = useContext(LoanContext) || {};
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Book One", author: "Author One", description: "Description One", isAvailable: true, image: "https://via.placeholder.com/128x196" },
    { id: 2, title: "Book Two", author: "Author Two", description: "Description Two", isAvailable: false, image: "https://via.placeholder.com/128x196" },
  ]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // Ajoutez une logique de recherche ici si nécessaire
  };

  const handleBorrow = (book: Book) => {
    if (addLoan) {
      addLoan(book);  // Ajouter le livre à l'état du prêt
    }
  };

  const renderBookCard = ({ item }: { item: Book }) => (
    <Animated.View entering={FadeInDown} style={{ marginBottom: 16, backgroundColor: "white", borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 }}>
      <TouchableOpacity style={{ flexDirection: "row", padding: 16 }} onPress={() => handleBorrow(item)}>
        <Image source={{ uri: item.image }} style={{ width: 80, height: 120, borderRadius: 8 }} resizeMode="cover" />
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>{item.title}</Text>
          <Text style={{ color: "#555", marginBottom: 4 }}>{item.author}</Text>
          <Text style={{ color: "#777", fontSize: 12, marginBottom: 8 }} numberOfLines={2}>{item.description}</Text>
          <MaterialIcons name="star" size={16} color="#FFD700" />
          <Text style={{ fontSize: 14, color: "#777" }}>Rating: 4.5</Text>
          <TouchableOpacity
            disabled={!item.isAvailable}
            style={{
              marginTop: 12,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: item.isAvailable ? "#007BFF" : "#CCCCCC",
              borderRadius: 20,
              alignItems: "center",
            }}
            onPress={() => handleBorrow(item)}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {item.isAvailable ? "Borrow" : "Unavailable"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4" }}>
      <View style={{ padding: 16, backgroundColor: "white", elevation: 5 }}>
        <View style={{ flexDirection: "row", backgroundColor: "#f0f0f0", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Ionicons name="search-outline" size={20} color="#777" />
          <TextInput
            style={{ flex: 1, marginLeft: 8 }}
            placeholder="Search books..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#aaa"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons name="close-circle" size={20} color="#777" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Books;
*/
import React, { useState, useContext, useCallback } from 'react';
import { LoanContext } from '../../../store/LoansContext';

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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Définir un type Book pour le livre
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  pageCount: number;
  isAvailable: boolean;
  image: string;
  category: string; 
  borrowed: boolean; // Ajouter une propriété pour la catégorie
}

const Books = () => {
  const context = useContext(LoanContext);

  if (!context) {
    return <Text>Loading...</Text>;
  }

  const { addLoan } = context;

  // État pour la recherche, les favoris et l'affichage
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Great Adventure', author: 'John Smith', description: 'An exciting journey through the unknown.', rating: 4.7, pageCount: 350, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Fiction' ,borrowed: false},
    { id: 2, title: 'Understanding Science', author: 'Alice Johnson', description: 'A deep dive into the world of scientific discoveries.', rating: 4.2, pageCount: 250, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Science',borrowed: false },
    { id: 3, title: 'History of Civilizations', author: 'Bob Brown', description: 'Explores the rise and fall of great civilizations.', rating: 4.5, pageCount: 500, isAvailable: false, image: 'https://via.placeholder.com/150', category: 'History' ,borrowed: false},
    { id: 4, title: 'Advanced Programming', author: 'Charlie Davis', description: 'Master advanced programming concepts and techniques.', rating: 4.8, pageCount: 600, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Technology',borrowed: false },
    { id: 5, title: 'The Art of Cooking', author: 'Diana Moore', description: 'A guide to mastering the art of cooking with style.', rating: 4.1, pageCount: 200, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Cooking' ,borrowed: false},
    { id: 6, title: 'Psychology and You', author: 'Eva White', description: 'A comprehensive look into human behavior and psychology.', rating: 4.3, pageCount: 320, isAvailable: false, image: 'https://via.placeholder.com/150', category: 'Psychology',borrowed: false },
    { id: 7, title: 'Designing the Future', author: 'Frank Green', description: 'A visionary approach to design and technology.', rating: 4.9, pageCount: 450, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Design' ,borrowed: false},
    { id: 8, title: 'Marketing Strategies', author: 'Grace Lee', description: 'Effective marketing strategies for today’s world.', rating: 4.6, pageCount: 300, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Business',borrowed: false },
    { id: 9, title: 'The Philosophy of Life', author: 'Hannah Black', description: 'Exploring deep philosophical questions about existence.', rating: 4.0, pageCount: 220, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Philosophy',borrowed: false },
    { id: 10, title: 'Mastering Data Science', author: 'Ian Grey', description: 'Learn to harness the power of data science.', rating: 4.5, pageCount: 350, isAvailable: true, image: 'https://via.placeholder.com/150', category: 'Technology' ,borrowed: true},
  ]);
  const [favorites, setFavorites] = useState<number[]>([]); // Liste des livres favoris
  const [searchQuery, setSearchQuery] = useState<string>(''); // Texte de recherche
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All'); // Catégorie sélectionnée
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false); // Afficher les favoris ou tous les livres
  const [borrowedBooks, setBorrowedBooks] = useState<number[]>([]); // Liste des livres empruntés

  // Fonction pour ajouter ou retirer un livre des favoris
  const toggleFavorite = (bookId: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(bookId)
        ? prevFavorites.filter((id) => id !== bookId)
        : [...prevFavorites, bookId]
    );
  };

  // Fonction pour gérer l'emprunt du livre
  const handleBorrow = (book: Book) => {
    if (book.isAvailable && !borrowedBooks.includes(book.id)) {
      setBorrowedBooks((prev) => [...prev, book.id]);
      addLoan(book); // Ajouter le livre emprunté à l'état
      alert(`You borrowed "${book.title}"`);
    }
  };

  // Rafraîchissement des livres
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Filtrer les livres en fonction de la recherche et de la catégorie
  const filteredBooks = books.filter((book) => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Barre de navigation entre "All Books" et "Favorites" */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setDisplayFavorites(false)}
          style={[
            styles.categoryButton,
            !displayFavorites ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonText}>All Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDisplayFavorites(true)}
          style={[
            styles.categoryButton,
            displayFavorites ? styles.activeButton : null,
          ]}>
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#888" />
        <TextInput
          placeholder="Search books..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filtrer par catégories */}
      <View style={styles.categoryFilterContainer}>
        {['All', 'Fiction', 'Non-fiction', 'Science', 'History', 'Technology', 'Business', 'Psychology', 'Cooking', 'Philosophy'].map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)}
            style={[
              styles.categoryButton,
              selectedCategory === category ? styles.activeButton : null,
            ]}>
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Affichage des livres */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={displayFavorites ? books.filter(book => favorites.includes(book.id)) : filteredBooks}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Image source={{ uri: item.image }} style={styles.bookImage} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              <Text style={styles.bookDescription}>{item.description}</Text>
              <Text style={styles.bookDetails}>
                Rating: {item.rating} | Pages: {item.pageCount}
              </Text>

              <View style={styles.actionButtonsContainer}>
                {/* Bouton Ajouter aux favoris */}
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.favoriteButton}>
                  <Ionicons
                    name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favorites.includes(item.id) ? 'red' : '#888'}
                  />
                </TouchableOpacity>

                {/* Bouton Emprunter */}
                {/*<TouchableOpacity
                  onPress={() => handleBorrow(item)}
                  style={[
                    styles.borrowButton,
                    borrowedBooks.includes(item.id) ? styles.borrowedButton : null,
                    !item.isAvailable && styles.disabledButton,
                  ]}
                  disabled={borrowedBooks.includes(item.id) || !item.isAvailable}>
                  <Text style={styles.borrowButtonText}>
                    {borrowedBooks.includes(item.id) ? 'Borrowed déjà' : (item.isAvailable ? 'Borrow' : 'Not Available')}
                  </Text>
                </TouchableOpacity>*/}
                  {/* Bouton Emprunter */}
        <TouchableOpacity
          onPress={() => handleBorrow(item)}
          style={[
            styles.borrowButton,
            borrowedBooks.includes(item.id) ? styles.borrowedButton : null, // Change style when borrowed
            !item.isAvailable && styles.disabledButton, // Disable if not available
          ]}
          disabled={borrowedBooks.includes(item.id) || !item.isAvailable}
        >
          <Text style={styles.borrowButtonText}>
            {borrowedBooks.includes(item.id) ? 'Borrowed déjà' : (item.isAvailable ? 'Borrow' : 'Not Available')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </ScrollView>
  );
};

// Styles améliorés
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#ddd',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  bookItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  bookDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  bookDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteButton: {
    marginRight: 16,
  },
  borrowButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  borrowedButton: {
    backgroundColor: '#28a745',
  },
  disabledButton: {
    backgroundColor: '#f0f0f0',
  },
  borrowButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Books;