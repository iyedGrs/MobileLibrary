import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
    <ScrollView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="p-6 items-center bg-gray-50 border-b border-gray-200">
        {/* Profile Picture */}
        <View className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
          {user?.imageUrl ? (
            <Image source={{ uri: user.imageUrl }} className="w-full h-full" />
          ) : (
            <Ionicons name="person-outline" size={50} color="#757575" />
          )}
        </View>

        {/* Username and Email */}
        <Text className="text-lg font-bold text-gray-800">
          {user?.username || "Sabrina Aryan"}
        </Text>
        <Text className="text-sm text-gray-500">
          {user?.primaryEmailAddress?.emailAddress || "SabrinaAry208@gmail.com"}
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity
          className="mt-4 px-4 py-2 bg-blue-500 rounded-full"
          onPress={navigateToEditProfile}
        >
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Options List */}
      <View className="mt-4">
        {/* Section 1: Favorites and Downloads */}
        <View className="bg-white border-t border-b border-gray-200">
          <OptionItem
            icon="heart-outline"
            title="Favourites"
            onPress={() =>
              router.push({
                pathname: "/books",
                params: { section: "favourites" },
              })
            }
          />
          <Separator />
          <OptionItem
            icon="download-outline"
            title="Downloads"
            onPress={() => console.log("Navigate to Downloads")}
          />
        </View>

        {/* Section 2: Languages, Location, Subscription, and Display */}
        <View className="bg-white border-t border-b border-gray-200 mt-4">
          <OptionItem
            icon="language-outline"
            title="Languages"
            onPress={() => console.log("Navigate to Languages")}
          />
          <Separator />
          <OptionItem
            icon="location-outline"
            title="Location"
            onPress={() => console.log("Navigate to Location")}
          />
          <Separator />
          <OptionItem
            icon="card-outline"
            title="Subscription"
            onPress={() => console.log("Navigate to Subscription")}
          />
          <Separator />
        </View>

        <View className="bg-white border-t border-b border-gray-200 mt-4">
          <OptionItem
            icon="trash-outline"
            title="Clear Cache"
            onPress={() => console.log("Clear Cache")}
          />
          <Separator />
          <OptionItem
            icon="time-outline"
            title="Clear History"
            onPress={() => router.push("/AdminPage")}
          />
          <Separator />
          <OptionItem
            icon="log-out-outline"
            title="Log Out"
            titleColor="text-red-500"
            iconColor="#ff4d4f"
            onPress={logout}
          />
        </View>
      </View>
    </ScrollView>
  );
}

type IconType =
  | "key"
  | "push"
  | "map"
  | "filter"
  | "at"
  | "search"
  | "repeat"
  | "link"
  | "body"
  | "code"
  | "menu"
  | "time"
  | "ellipse"
  | "image"
  | "stop"
  | "text"
  | "alert"
  | "checkbox"
  | "radio"
  | "time-outline"
  | "trash-outline"
  | "log-out-outline"
  | "heart-outline"
  | "download-outline"
  | "language-outline"
  | "location-outline"
  | "card-outline";

interface OptionItemProps {
  icon: IconType;
  title: string;
  onPress: () => void;
  titleColor?: string;
  iconColor?: string;
}

const OptionItem = ({
  icon,
  title,
  onPress,
  titleColor = "text-gray-800",
  iconColor = "#2575fc",
}: OptionItemProps) => (
  <TouchableOpacity className="flex-row items-center p-4" onPress={onPress}>
    <Ionicons name={icon} size={24} color={iconColor} />
    <Text className={`ml-4 flex-1 font-semibold ${titleColor}`}>{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="#757575" />
  </TouchableOpacity>
);

const Separator = () => <View className="h-px bg-gray-200 mx-4" />;
