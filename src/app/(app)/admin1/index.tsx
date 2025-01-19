import { View, Text } from "react-native";
import CustomButton from "@/src/components/CustomButton";
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

      {/* Add New Book Section */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="add" size={24} color="black" />
          <Text className="text-lg font-semibold ml-2">Add New Book</Text>
        </View>
        <Text className="text-sm text-gray-600">
          Add a new book to the library
        </Text>
      </View>

      {/* Manage Books Section */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-6">
        <View className="flex-row items-center mb-4">
          <Feather name="settings" size={24} color="black" />
          <Text className="text-lg font-semibold ml-2">Manage Books</Text>
        </View>
        <Text className="text-sm text-gray-600">
          Edit or remove existing books
        </Text>
      </View>

      {/* User Requests Section */}
      <View className="bg-white p-6 rounded-lg shadow-md">
        <View className="flex-row items-center mb-4">
          <AntDesign name="user" size={24} color="black" />
          <Text className="text-lg font-semibold ml-2">User Requests</Text>
        </View>
        <Text className="text-sm text-gray-600">
          View and manage borrowing requests
        </Text>
      </View>
    </View>
  );
};

export default Admin;
