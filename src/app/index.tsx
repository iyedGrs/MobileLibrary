import { Link, Redirect } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
// import "../global.css";
const index = () => {
  return <Redirect href="/auth/login" />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
