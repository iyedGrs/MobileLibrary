import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import { Link } from "expo-router";
const index = () => {
  return (
    <View style={styles.container}>
      <Text className="text-red-500">Login </Text>
      <Link href="/auth/login" asChild>
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
