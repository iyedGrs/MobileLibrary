import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { THEME_COLORS } from "../../../constants/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useBooks } from "@/src/hooks/useBooks";

// Définir le type pour les livres
interface Book {
  id: number;
  title: string;
}

export default function HomeScreen() {
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState("All Books");
  
  // Définir un état pour les livres favoris avec le bon type
  const [favorites, setFavorites] = useState<Book[]>([]); // Array of Book type

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const books = [
    { id: 1, title: "Book Title 1" },
    { id: 2, title: "Book Title 2" },
    { id: 3, title: "Book Title 3" },
  ];

  const { books: books1, error, isLoading, fetchBooks } = useBooks();
  const currentItems = activeTab === "All Books" ? books1 : favorites;
  const query = "harry";
  const handleSearch = () => {
    if (query.trim()) {
      fetchBooks(query);
      console.log("searching for books", books1);
    }
  };

  // Fonction pour ajouter ou supprimer des favoris
  const toggleFavorite = (book: Book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
      // Si le livre est déjà dans les favoris, on le retire
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
    } else {
      // Sinon, on l'ajoute
      setFavorites([...favorites, book]);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Feather name="menu" size={24} color="black" />
          <View className="flex-row space-x-4">
            <AntDesign name="bells" size={24} color="black" />
            <AntDesign name="user" size={24} color="black" />
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center p-3 bg-gray-100 rounded-lg mb-6">
          <EvilIcons name="search" size={24} color="black" />
          <TextInput className="flex-1 ml-2" placeholder="Search" />
        </View>

        {/* Title */}
        <Text
          className="text-2xl font-bold mb-6"
          style={{ color: THEME_COLORS.text }}
        >
          Featured Books
        </Text>

        {/* Content */}
        <ScrollView className="p-4 bg-gray-50">
          {currentItems.map((item) => (
            <View
              key={item.id}
              className="mb-4 p-4 bg-white rounded-lg shadow-sm"
            >
              <Text className="text-lg font-semibold text-gray-800">
                {item.title}
              </Text>

              {/* Bouton pour ajouter/retirer des favoris */}
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                className="mt-4"
              >
                <MaterialIcons
                  name={favorites.some((fav) => fav.id === item.id)
                    ? "favorite"
                    : "favorite-outline"}
                  size={24}
                  color={favorites.some((fav) => fav.id === item.id)
                    ? "red"
                    : "gray"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Tabs - Horizontal buttons */}
        <View className="flex-row justify-around p-4 bg-gray-100 rounded-lg mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab("All Books")}
            className={`flex-1 items-center py-2 rounded-lg ${
              activeTab === "All Books" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <Feather name="book-open" size={24} color="black" />
            <Text
              className={`text-lg font-semibold ${
                activeTab === "All Books" ? "text-white" : "text-gray-500"
              }`}
            >
              All Books
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("Favorites")}
            className={`flex-1 items-center py-2 rounded-lg ${
              activeTab === "Favorites" ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            <MaterialIcons name="favorite-outline" size={24} color="black" />
            <Text
              className={`text-lg font-semibold ${
                activeTab === "Favorites" ? "text-white" : "text-gray-500"
              }`}
            >
              Favorites
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="search" onPress={handleSearch} />
      </View>
    </ScrollView>
  );
}
