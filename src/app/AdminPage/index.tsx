import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import React from "react";

const Admin = () => {
  return (
    <View className="p-4 bg-gray-100 flex-1">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold">Admin Dashboard</Text>
        <AntDesign name="user" size={24} color="black" />
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between mb-6">
        <View className="bg-white p-6 rounded-lg shadow-md w-[48%]">
          <Text className="text-lg font-semibold">Total Books</Text>
          <Text className="text-3xl font-bold mt-2">234</Text>
        </View>

        <View className="bg-white p-6 rounded-lg shadow-md w-[48%]">
          <Text className="text-lg font-semibold">Active Loans</Text>
          <Text className="text-3xl font-bold mt-2">28</Text>
        </View>
      </View>

      {/* Add New Book Button */}
      <TouchableOpacity
        onPress={() => console.log("Add New Book pressed")}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <View className="flex-row items-center">
          <Ionicons name="add" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg font-semibold">Add New Book</Text>
            <Text className="text-sm text-gray-600">
              Add a new book to the library
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Manage Books Button */}
      <TouchableOpacity
        onPress={() => console.log("Manage Books pressed")}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <View className="flex-row items-center">
          <Feather name="settings" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg font-semibold">Manage Books</Text>
            <Text className="text-sm text-gray-600">
              Edit or remove existing books
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* User Requests Button */}
      <TouchableOpacity
        onPress={() => console.log("User Requests pressed")}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <View className="flex-row items-center">
          <AntDesign name="user" size={24} color="black" />
          <View className="ml-2">
            <Text className="text-lg font-semibold">User Requests</Text>
            <Text className="text-sm text-gray-600">
              View and manage borrowing requests
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Admin;
