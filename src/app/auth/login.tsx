import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/CustomButton";
import { router } from "expo-router";
const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegisterRedirect = () => {
    router.push("/auth/signup");
  };
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      {/* <SvgUri width="100%" height="100%" uri="http://www.w3.org/2000/svg" /> */}
      <Ionicons name="library-outline" size={64} color="#2699E6" />
      <Text className="text-2xl font-bold text-center text-black mt-4">
        Welcome to BiblioTech
      </Text>

      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-6"
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 mt-4"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View className="w-full mt-4 rounded-lg">
        <Button title="Login" />
      </View>

      <CustomButton
        title="Register"
        containerStyle="w-full mt-6 border   border-blue-500 rounded-lg px-4 py-2 flex items-center justify-center"
        onPress={handleRegisterRedirect}
        textStyle="text-blue-500"
      />
      {/* <View className="w-full mt-6 border  border-blue-500 rounded-lg px-4 py-2 flex items-center justify-center">
        <Text className="text-blue-500">Register</Text>
      </View> */}
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
//svg
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library-big w-16 h-16 text-blue-600"><rect width="8" height="18" x="3" y="3" rx="1"></rect><path d="M7 3v18"></path><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"></path></svg> */
}
export default login;
