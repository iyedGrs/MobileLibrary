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

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp, isLoaded, setActive } = useSignUp();
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<number>(0); // État pour la force du mot de passe

  const handleLoginRedirect = () => {
    router.back();
  };

  // Fonction pour évaluer la force du mot de passe
  const evaluatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  // Fonction pour afficher la force du mot de passe
  const renderPasswordStrength = (strength: number) => {
    let color = "red";
    let label = "Weak";
    if (strength >= 4) {
      color = "green";
      label = "Strong";
    } else if (strength >= 2) {
      color = "orange";
      label = "Medium";
    }

    return (
      <View style={styles.passwordStrengthContainer}>
        <Text style={{ color }}>Password Strength: {label}</Text>
        <View style={styles.passwordStrengthBar}>
          <View
            style={{
              width: `${(strength / 5) * 100}%`,
              height: "100%",
              backgroundColor: color,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    );
  };

  const handleSignUp = async () => {
    if (!isLoaded) return;

    // Vérifier que tous les champs sont remplis
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    // Vérifier la force du mot de passe
    if (passwordStrength < 3) {
      Alert.alert(
        "Error",
        "Password is too weak. It must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

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
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
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

      {/* Champ pour le nom */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      {/* Champ pour l'email */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Champ pour le mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordStrength(evaluatePasswordStrength(text)); // Mettre à jour la force du mot de passe
        }}
      />

      {/* Afficher la force du mot de passe */}
      {password && renderPasswordStrength(passwordStrength)}

      {/* Champ pour confirmer le mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />

      {/* Bouton pour s'inscrire */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Lien pour se connecter */}
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginLink}>
          You already have an account? Connect here.
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
  loginLink: {
    marginTop: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  passwordStrengthContainer: {
    width: "100%",
    marginBottom: 15,
  },
  passwordStrengthBar: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginTop: 4,
  },
});

export default SignUp;
