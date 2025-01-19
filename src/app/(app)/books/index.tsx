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
import { useBooks } from "../../../hooks/useBooks";
import Animated, { FadeInDown } from "react-native-reanimated";

const categories = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Biography",
];

export default function BooksScreen() {
  const { books, isLoading, error, fetchBooks, fetchFreeBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFreeBooks();
    setRefreshing(false);
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      fetchBooks(text);
    } else if (text.length === 0) {
      fetchFreeBooks();
    }
  };

  type Props = {
    item: any;
    index: number;
  };

  const renderBookCard = ({ item, index }: Props) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      className="bg-white rounded-xl shadow-sm mx-4 mb-4 overflow-hidden"
    >
      <TouchableOpacity
        className="flex-row p-3"
        onPress={() => router.push(`/books/${item.id}`)}
      >
        <Image
          source={{
            uri:
              item.volumeInfo?.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x196",
          }}
          className="w-24 h-36 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4 justify-between">
          <View>
            <Text
              className="text-lg font-semibold mb-1 text-gray-800"
              numberOfLines={2}
            >
              {item.volumeInfo?.title}
            </Text>
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={1}>
              {item.volumeInfo?.authors?.join(", ") || "Unknown Author"}
            </Text>
            <Text className="text-xs text-gray-500" numberOfLines={3}>
              {item.volumeInfo?.description || "No description available"}
            </Text>
          </View>
          <View className="flex-row items-center mt-2">
            <MaterialIcons name="star" size={16} color={THEME_COLORS.primary} />
            <Text className="text-sm text-gray-600 ml-1">
              {item.volumeInfo?.averageRating || "N/A"}
            </Text>
            {item.volumeInfo?.pageCount && (
              <Text className="text-sm text-gray-600 ml-4">
                {item.volumeInfo.pageCount} pages
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Header */}
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

      {/* Categories */}
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
                  ? "bg-blue-500  "
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

      {/* Books List */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={THEME_COLORS.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-red-500 text-center mb-4">{error}</Text>
          <TouchableOpacity
            className="bg-primary px-6 py-3 rounded-full"
            onPress={() => fetchFreeBooks()}
          >
            <Text className="text-white font-medium">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderBookCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center p-4">
              <Text className="text-gray-500 text-center">
                No books found. Try a different search term.
              </Text>
            </View>
          }
        />
      )}

      {/* FAB - Add Book */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          backgroundColor: THEME_COLORS.primary,
          width: 56,
          height: 56,
          borderRadius: 28,
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          zIndex: 1000,
        }}
        onPress={() => router.push("/books/add")}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
