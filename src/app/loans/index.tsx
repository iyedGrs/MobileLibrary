import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "../../constants/config";

export default function LoansScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Tabs */}
      <View className="flex-row bg-white border-b border-gray-200">
        <TouchableOpacity className="flex-1 py-4 items-center border-b-2 border-blue-500">
          <Text style={{ color: THEME_COLORS.primary }}>Active Loans</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 py-4 items-center">
          <Text className="text-gray-500">History</Text>
        </TouchableOpacity>
      </View>

      {/* Loans List */}
      <FlatList
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500">No active loans</Text>
          </View>
        }
      />
    </View>
  );
}
