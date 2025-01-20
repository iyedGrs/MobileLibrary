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
import { useSupBook } from "@/src/hooks/useSupBook";

export default function HomeScreen() {
  const { signOut, user } = useClerk();
  const { books, loadBooks } = useSupBook();
  console.log("these are books", books);
  const recentBooks = books?.slice(0, 3) || [];
  // const handleSignOut = async () => {
  //   try {
  //     await signOut();
  //     router.replace("/");
  //   } catch (err) {
  //     console.error(JSON.stringify(err, null, 2));
  //   }
  // };

  useEffect(() => {
    loadBooks();
  }, []);
  interface QuickActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
  }

  const QuickActionButton = ({
    icon,
    label,
    onPress,
  }: QuickActionButtonProps) => (
    <TouchableOpacity
      onPress={onPress}
      className="items-center justify-center bg-white rounded-xl p-4 flex-1 mx-2 shadow-sm"
    >
      {icon}
      <Text className="text-sm text-gray-600 mt-2">{label}</Text>
    </TouchableOpacity>
  );

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
              <View className="flex-row justify-between items-center">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">
                    {books?.length || 0}
                  </Text>
                  <Text className="text-sm text-gray-600">Total Books</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">2</Text>
                  <Text className="text-sm text-gray-600">Reading</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-primary">15</Text>
                  <Text className="text-sm text-gray-600">Completed</Text>
                </View>
              </View>
            </View>

            {/* Recent Books */}
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold">Recent Books</Text>
                <TouchableOpacity onPress={() => router.push("/books")}>
                  <Text className="text-primary">See All</Text>
                </TouchableOpacity>
              </View>
              {/* <BookList currentItems={recentBooks} /> */}
            </View>

            {/* Reading Goals */}
            <View className="mx-4 mb-4 p-4 bg-white rounded-xl shadow-sm">
              <Text className="text-lg font-semibold mb-3">Reading Goal</Text>
              <View className="bg-gray-100 h-4 rounded-full overflow-hidden">
                <View className="bg-primary w-3/4 h-full" />
              </View>
              <Text className="text-sm text-gray-600 mt-2">
                15 of 20 books read this year
              </Text>
            </View>
            {/* dispalying some books  */}
            {/* <ScrollView className="p-4"> */}
            <BookList
              currentItems={books?.map((book) => ({
                id: book.id,
                volumeInfo: {
                  title: book.title || "",
                  authors: book.author ? [book.author] : [],
                  description: book.description || "",
                  imageLinks: { thumbnail: book.image_url || "" },
                },
              }))}
            />
            {/* </ScrollView> */}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
