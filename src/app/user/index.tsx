import React from "react";
import { View, Text, StyleSheet } from "react-native";

const index = () => {
  return (
    <View className="flex-1 items-center justify-center bg-red-500">
      <Text>index user</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
