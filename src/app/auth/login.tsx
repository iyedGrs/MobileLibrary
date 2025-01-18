import React, { useCallback, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/CustomButton";
import { router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";

const login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const handleRegisterRedirect = () => {
    router.push("/auth/signup");
  };
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;
    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, username, password]);
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

      <View className="w-full mt-4 rounded-lg  ">
        <Button title="Login" onPress={onSignInPress} />
      </View>

      <CustomButton
        title="Register"
        containerStyle="w-full mt-6 border   border-blue-500 rounded-lg px-4 py-2 flex items-center justify-center"
        onPress={handleRegisterRedirect}
        textStyle="text-blue-500"
      />

      <CustomButton
        title="Forgot password Reset it here ?"
        onPress={handleRegisterRedirect}
        textStyle="text-gray-500 underline hover:text-gray-700 font-extrabold"
      />
    </View>
  );
};

export default login;
