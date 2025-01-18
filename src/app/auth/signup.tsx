import { useSignUp } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";

const signUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, isLoaded, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const handleLoginRedirect = () => {
    router.back();
  };
  const handleSignUp = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        username: name,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires.");
      return;
    }
    // if (existingUsers.include(email)){
    //   Alert.alert(
    //     "Cet email existe déjà"
    //   )
    // }
  };
  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      // iyedGrassi77#
      if (signUpAttempt.status === "complete") {
        await setActive({
          session: signUpAttempt.createdSessionId,
        });
      } else {
        console.log(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };
  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text className="underline text-[#007BFF] mt-4">
          You already have an account ? Connect here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default signUp;
