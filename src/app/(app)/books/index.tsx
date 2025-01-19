import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { THEME_COLORS } from "../../../constants/config";
import { Link, router } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
];

const dummyBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A novel set in the Jazz Age that examines themes of wealth, class, and the American Dream.",
    rating: 4.2,
    pageCount: 218,
    image: "https://via.placeholder.com/128x196",
    isAvailable: true,
    isFavorite: false,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    description:
      "A dystopian social science fiction novel and cautionary tale about the future of totalitarianism.",
    rating: 4.8,
    pageCount: 328,
    image: "https://via.placeholder.com/128x196",
    isAvailable: false,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    description:
      "A compelling account of the history of humanity, from the Stone Age to modern-day technological advancements.",
    rating: 4.6,
    pageCount: 443,
    image: "https://via.placeholder.com/128x196",
    isAvailable: true,
    isFavorite: false,
  },
];

export default function BooksScreen() {
  const [books, setBooks] = useState(dummyBooks);
  const [borrowedBooks, setBorrowedBooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewFavorites, setViewFavorites] = useState<boolean>(false);

  const fetchBooks = (query: string = "") => {
    setIsLoading(true);
    try {
      const data = dummyBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(data);
      setError(null);
    } catch (err) {
      setError("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchBooks(searchQuery);
    setRefreshing(false);
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      fetchBooks(text);
    } else if (text.length === 0) {
      fetchBooks();
    }
  };

  const toggleFavorite = (bookId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(bookId)) {
        return prevFavorites.filter((id) => id !== bookId);
      } else {
        return [...prevFavorites, bookId];
      }
    });
  };

  const handleBorrowBook = (book: any) => {
    setBorrowedBooks((prevBorrowedBooks) => [...prevBorrowedBooks, book.id]);
    alert(`You have borrowed "${book.title}"`);
  };

  const filteredBooks = viewFavorites
    ? books.filter((book) => favorites.includes(book.id))
    : books;

  const renderBookCard = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      className="bg-white rounded-xl shadow-sm mx-4 mb-4 overflow-hidden"
    >
      <TouchableOpacity
        className="flex-row p-3"
        onPress={() => router.push(`/books/${item.id}`)}
      >
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/128x196" }}
          className="w-24 h-36 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4 justify-between">
          <View>
            <Text
              className="text-lg font-semibold mb-1 text-gray-800"
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
              {item.author || "Unknown Author"}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={3}>
              {item.description || "No description available"}
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <MaterialIcons name="star" size={16} color={THEME_COLORS.primary} />
            <Text className="text-sm text-gray-600 ml-1">
              {item.rating || "N/A"}
            </Text>
            {item.pageCount && (
              <Text className="text-sm text-gray-600 ml-4">
                {item.pageCount} pages
              </Text>
            )}
          </View>
          <TouchableOpacity
            disabled={borrowedBooks.includes(item.id) || !item.isAvailable}
            className={`mt-3 py-2 px-4 rounded-full ${
              borrowedBooks.includes(item.id)
                ? "bg-green-500"
                : item.isAvailable
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
            onPress={() => {
              if (item.isAvailable && !borrowedBooks.includes(item.id)) {
                handleBorrowBook(item);
              }
            }}
          >
            <Text
              className={`text-white ${
                borrowedBooks.includes(item.id)
                  ? ""
                  : !item.isAvailable
                  ? "text-gray-600"
                  : ""
              }`}
            >
              {borrowedBooks.includes(item.id)
                ? "Borrowed déjà"
                : item.isAvailable
                ? "Borrow"
                : "Unavailable"}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="absolute top-2 right-2"
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons
            name={favorites.includes(item.id) ? "heart" : "heart-outline"}
            size={24}
            color={favorites.includes(item.id) ? "red" : "gray"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-2">
          <Ionicons
            name="search-outline"
            size={20}
            color={THEME_COLORS.secondary}
          />
          <TextInput
            placeholder="Search books..."
            className="flex-1 ml-2"
            placeholderTextColor={THEME_COLORS.secondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={THEME_COLORS.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="py-3 bg-gray-50">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === item
                  ? "bg-blue-500"
                  : "bg-white border-2 border-gray-200"
              }`}
            >
              <Text
                className={`${
                  selectedCategory === item
                    ? "text-white font-bold"
                    : "text-gray-700"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="flex-row justify-around py-3 bg-gray-50">
        <TouchableOpacity
          onPress={() => setViewFavorites(false)}
          className="px-4 py-2 rounded-full bg-blue-500"
        >
          <Text className="text-white font-bold">All Books</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewFavorites(true)}
          className="px-4 py-2 rounded-full bg-blue-500"
        >
          <Text className="text-white font-bold">Favorites</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={THEME_COLORS.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBooks}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
