import { Link, Redirect } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const index = () => {
  return <Redirect href="/auth/login" />;
};

export default index;
