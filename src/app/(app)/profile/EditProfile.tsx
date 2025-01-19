import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";

const EditProfile: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(
    user?.primaryEmailAddress?.emailAddress || ""
  );
  const [currentPassword, setCurrentPassword] = useState<string>(""); // Nouvel état pour le mot de passe actuel
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(
    user?.imageUrl || null
  );
  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const evaluatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    // if (currentPassword) {
    //   try {
    //     // await user.
    //   } catch (error) {
    //     Alert.alert("Error", "Current password is incorrect.");
    //     return;
    //   }
    // } else {
    //   Alert.alert("Error", "Please enter your current password.");
    //   return;
    // }

    if (password && password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (password) {
      try {
        await user.updatePassword({ currentPassword, newPassword: password });
      } catch (error) {
        if (
          error instanceof Error &&
          error.message.includes("same as the current password")
        ) {
          Alert.alert(
            "Error",
            "New password cannot be the same as the current password."
          );
          return;
        }
        console.error("Error updating password:", error);
        Alert.alert("Error", "Failed to update password. Please try again.");
        return;
      }
    }

    try {
      if (username && username !== user.username) {
        await user.update({ username });
      }

      if (email && email !== user.primaryEmailAddress?.emailAddress) {
        await user.update({ primaryEmailAddressId: email });
      }
      if (imageUri && imageUri !== user.imageUrl) {
        await user.setProfileImage({ file: imageUri });
      }

      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

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
      <View className="mt-2">
        <Text style={{ color }}>Password Strength: {label}</Text>
        <View className="h-2 bg-gray-200 rounded-full mt-1">
          <View
            className="h-2 rounded-full"
            style={{
              width: `${(strength / 5) * 100}%`,
              backgroundColor: color,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 bg-gray-50 p-6">
          <Text className="text-2xl font-bold text-center mb-6">
            Edit Profile
          </Text>

          {/* Photo de profil */}
          <TouchableOpacity
            onPress={handleImagePick}
            className="items-center mb-6"
          >
            <View className="w-32 h-32 bg-gray-300 rounded-full mb-2">
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-full rounded-full"
                />
              ) : (
                <Ionicons
                  name="person-outline"
                  size={50}
                  color="#808080"
                  style={{ alignSelf: "center", marginTop: 35 }}
                />
              )}
            </View>
            <Text className="text-blue-500 text-center">Change Photo</Text>
          </TouchableOpacity>

          {/* Champ pour le nom d'utilisateur */}
          <TextInput
            className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />

          {/* Champ pour l'email */}
          <TextInput
            className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Champ pour le mot de passe actuel */}
          <TextInput
            className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
            placeholder="Current Password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          {/* Champ pour le nouveau mot de passe */}
          <TextInput
            className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
            placeholder="New Password (Optional)"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordStrength(evaluatePasswordStrength(text)); // Mettre à jour la force du mot de passe
            }}
          />

          {/* Indicateur de force du mot de passe */}
          {password && renderPasswordStrength(passwordStrength)}

          {/* Champ pour confirmer le mot de passe */}
          <TextInput
            className="h-12 border border-gray-400 rounded-lg px-4 mb-6"
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Bouton pour sauvegarder les modifications */}
          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-blue-500 py-3 rounded-lg items-center"
          >
            <Text className="text-white text-lg">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
