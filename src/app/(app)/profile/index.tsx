import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "../../../constants/config";
import { useAuth } from "../../../hooks/useAuth"; // clerck

export default function ProfileScreen() {
  //   const { logout, user } = useAuth();
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };
  const logout = () => {
    console.log("logout");
  };
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Profile Header */}
      <View className="bg-white p-6 items-center border-b border-gray-200">
        <View className="w-24 h-24 rounded-full bg-gray-200 mb-4">
          {/* Add profile image here */}
        </View>
        <Text className="text-xl font-bold mb-1">
          {user?.name || "User Name"}
        </Text>
        <Text className="text-gray-500">
          {user?.email || "email@example.com"}
        </Text>
      </View>

      {/* Menu Items */}
      <View className="mt-4">
        <TouchableOpacity className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100">
          <Ionicons
            name="person-outline"
            size={24}
            color={THEME_COLORS.secondary}
          />
          <Text className="ml-4 flex-1">Edit Profile</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME_COLORS.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100">
          <Ionicons
            name="settings-outline"
            size={24}
            color={THEME_COLORS.secondary}
          />
          <Text className="ml-4 flex-1">Settings</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME_COLORS.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
          onPress={logout}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color={THEME_COLORS.danger}
          />
          <Text className="ml-4 flex-1" style={{ color: THEME_COLORS.danger }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
