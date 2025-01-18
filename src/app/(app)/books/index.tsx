import React from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "../../../constants/config";
import { Link } from "expo-router";

export default function BooksScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="p-4 bg-white border-b border-gray-200">
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
          />
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-4 px-2"
      >
        {["All", "Fiction", "Non-Fiction", "Science", "History"].map(
          (category) => (
            <TouchableOpacity
              key={category}
              className="px-4 py-2 bg-white rounded-full mr-2 border border-gray-200"
            >
              <Text>{category}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Books List */}
      <FlatList
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500">No books found</Text>
          </View>
        }
      />

      {/* Add Book FAB */}
      <Link href="/books/add" asChild>
        <TouchableOpacity
          className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full items-center justify-center"
          style={{ backgroundColor: THEME_COLORS.primary }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
