import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 
import { THEME_COLORS } from "../../../constants/config";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  // Navigation vers Edit Profile
  const navigateToEditProfile = () => {
    router.push("/profile/EditProfile");
  };

  // Déconnexion
  const logout = async () => {
    try {
      await signOut();
      console.log("User logged out");
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <LinearGradient
        colors={['#6a11cb', '#2575fc']} // Modern gradient
        className="p-6 items-center rounded-b-xl mb-6"
      >
        {/* Profile Picture */}
        <View className="w-24 h-24 rounded-full bg-gray-200 mb-4 justify-center items-center shadow-lg">
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} className="w-full h-full rounded-full" />
          ) : (
            <Ionicons name="person-outline" size={50} color="#fff" />
          )}
        </View>
        <Text className="text-2xl font-bold text-white mb-1">
          {user?.username || "Username"}
        </Text>
        <Text className="text-white text-opacity-80">
          {user?.primaryEmailAddress?.emailAddress || "email@example.com"}
        </Text>
      </LinearGradient>

      {/* Menu Items */}
      <View className="w-[90%] m-auto mt-6 space-y-4">
        {/* Edit Profile */}
        <TouchableOpacity
          className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
          onPress={navigateToEditProfile}
        >
          <Ionicons name="person-outline" size={24} color="#2575fc" />
          <Text className="ml-4 flex-1 text-gray-800 font-semibold">Edit Profile</Text>
          <Ionicons name="chevron-forward" size={24} color="#2575fc" />
        </TouchableOpacity>

        {/* Favorites */}
        <TouchableOpacity
          className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
          onPress={() => console.log("Navigate to Favorites")}
        >
          <Ionicons name="heart-outline" size={24} color="#2575fc" />
          <Text className="ml-4 flex-1 text-gray-800 font-semibold">Favorites</Text>
          <Ionicons name="chevron-forward" size={24} color="#757575" />
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity
          className="flex-row items-center bg-white p-4 rounded-lg shadow-md"
        >
          <Ionicons name="settings-outline" size={24} color="#2575fc" />
          <Text className="ml-4 flex-1 text-gray-800 font-semibold">Settings</Text>
          <Ionicons name="chevron-forward" size={24} color="#2575fc" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center bg-red-50 p-4 rounded-lg shadow-md"
          onPress={logout}
        >
          <Ionicons name="log-out-outline" size={24} color="#ff4d4f" />
          <Text className="ml-4 flex-1 font-semibold text-red-500">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
