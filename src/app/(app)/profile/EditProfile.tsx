import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "../../../constants/config";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useClerk } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const navigateToEditProfile = () => {
    router.push("EditProfile"); 
  };

  
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
    <ScrollView className="flex-1 bg-gray-50">
      
      <View className="bg-white p-6 items-center border-b border-gray-200">
    
        <View className="w-24 h-24 rounded-full bg-gray-200 mb-4">
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <Ionicons
              name="person-outline"
              size={40}
              color={THEME_COLORS.secondary}
              style={{ alignSelf: "center", marginTop: "30%" }}
            />
          )}
        </View>

        <Text className="text-xl font-bold mb-1">
          {user?.username || "Username"}
        </Text>
        <Text className="text-gray-500">
          {user?.primaryEmailAddress?.emailAddress || "email@example.com"}
        </Text>
      </View>

     
      <View className="w-[80%] m-auto h-full flex flex-1 mt-6">
     
        <TouchableOpacity
          className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
          onPress={navigateToEditProfile}
        >
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

       
        <TouchableOpacity
          className="flex-row items-center bg-white px-6 py-4 border-b border-gray-100"
          onPress={() => console.log("Navigate to Favorites")}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color={THEME_COLORS.secondary}
          />
          <Text className="ml-4 flex-1">Favorites</Text>
          <Ionicons name="chevron-forward" size={24} color="#757575" />
        </TouchableOpacity>

      
        <TouchableOpacity className="flex-row items-center bg-white px-6 py-4 border-b border-gray-300">
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