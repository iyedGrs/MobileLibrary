import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { THEME_COLORS } from "../../../constants/config";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useBooks } from "@/src/hooks/useBooks";
import BookList from "@/src/components/BookList";
import { Image } from "@/src/components/Image";

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

  useEffect(() => {
    fetchRandomBooks();
  }, []);
  interface QuickActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
  }

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
    <SafeAreaView className="flex-1 bg-gray-50">
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            {/* Header with Welcome and Profile */}
            <View className="flex-row justify-between items-center p-4 bg-white">
              <View>
                <Text className="text-lg text-gray-500">Welcome back,</Text>
              </View>
              <View>
                <Text className="text-2xl font-bold">
                  {user?.firstName || "Reader"}
                </Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View className="p-4">
              <Text className="text-lg font-semibold mb-3">Quick Actions</Text>
              <View className="flex-row">
                <QuickActionButton
                  icon={
                    <AntDesign
                      name="plus"
                      size={24}
                      color={THEME_COLORS.primary}
                    />
                  }
                  label="Add Book"
                  onPress={() => router.push("/books/add")}
                />
                <QuickActionButton
                  icon={
                    <Feather
                      name="book-open"
                      size={24}
                      color={THEME_COLORS.primary}
                    />
                  }
                  label="My Books"
                  onPress={() => router.push("/books")}
                />
                <QuickActionButton
                  icon={
                    <MaterialIcons
                      name="category"
                      size={24}
                      color={THEME_COLORS.primary}
                    />
                  }
                  label="Categories"
                  onPress={() => router.push("/categories")}
                />
              </View>
            </View>

            {/* Reading Progress */}
            <View className="mx-4 p-4 bg-white rounded-xl shadow-sm">
              <Text className="text-lg font-semibold mb-3">
                Reading Progress
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
