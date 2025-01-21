import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"; // Ajoutez KeyboardAvoidingView et ScrollView
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/src/components/CustomButton";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const handleRegisterRedirect = () => {
    console.log("Redirecting to /auth/signup");
    router.replace("/auth/signup");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajuste le comportement selon la plateforme
      style={styles.container} // Applique un style flex: 1
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Ajuste l'offset pour iOS
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer} // Permet de faire défiler le contenu
        keyboardShouldPersistTaps="handled" // Gère les taps sur le clavier
      >
        {/* Icon */}
        <Ionicons name="library-outline" size={64} color="#3B82F6" />
        <Text className="text-3xl font-bold text-center text-white mt-4">
          Welcome to BiblioTech
        </Text>

        {/* Username Input */}
        <TextInput
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mt-6 text-white placeholder-gray-400"
          placeholder="Username"
          placeholderTextColor="#9CA3AF"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />

        {/* Password Input */}
        <TextInput
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 mt-4 text-white placeholder-gray-400"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        {/* Login Button */}
        <CustomButton
          title="Login"
          containerStyle="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl px-4 py-3 shadow-lg"
          onPress={onSignInPress}
          textStyle="text-white font-bold text-lg"
        />

        {/* Register Button */}
        <CustomButton
          title="Register"
          containerStyle="w-full mt-4 bg-transparent border border-blue-500 rounded-xl px-4 py-3"
          onPress={handleRegisterRedirect}
          textStyle="text-blue-500 font-bold text-lg"
        />

        {/* Forgot Password Link */}
        <CustomButton
          title="Forgot password? Reset it here"
          onPress={handleRegisterRedirect}
          textStyle="text-gray-400 underline font-semibold mt-4"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles pour le composant
const styles = StyleSheet.create({
  container: {
    flex: 1, // Prend toute la hauteur disponible
    backgroundColor: "#1F2937", // Couleur de fond (équivalent à bg-gray-900)
  },
  scrollContainer: {
    flexGrow: 1, // Permet au contenu de prendre toute la hauteur disponible
    justifyContent: "center", // Centre le contenu verticalement
    alignItems: "center", // Centre le contenu horizontalement
    padding: 20, // Espacement intérieur
  },
});

export default Login;