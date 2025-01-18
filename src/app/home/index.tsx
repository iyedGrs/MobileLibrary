import React from "react";
import { View, Text, ScrollView } from "react-native";
import { THEME_COLORS } from "../../constants/config";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <Text
          className="text-2xl font-bold mb-6"
          style={{ color: THEME_COLORS.text }}
        >
          Welcome to BiblioTech
        </Text>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white p-4 rounded-lg flex-1 mr-2">
            <Text className="text-sm text-gray-500">Books Borrowed</Text>
            <Text className="text-xl font-bold">5</Text>
          </View>
          <View className="bg-white p-4 rounded-lg flex-1 ml-2">
            <Text className="text-sm text-gray-500">Due Soon</Text>
            <Text className="text-xl font-bold">2</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-lg p-4 mb-6">
          <Text className="text-lg font-semibold mb-4">Recent Activity</Text>
          {/* Add activity items here */}
        </View>

        {/* Featured Books */}
        <View className="bg-white rounded-lg p-4">
          <Text className="text-lg font-semibold mb-4">Featured Books</Text>
          {/* Add featured books carousel here */}
        </View>
      </View>
    </ScrollView>
  );
}
