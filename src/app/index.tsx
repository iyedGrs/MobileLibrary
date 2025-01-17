import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import "../global.css";
const index = () => {
  return (
    <View style={styles.container}>
      <Text className="text-red-600">index</Text>
      <Link href="/auth" asChild>
        <Button title="click me " />
      </Link>
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
