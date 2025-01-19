import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Pour la navigation
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";

const EditProfile: React.FC = () => {
  const { user } = useUser();
  const router = useRouter(); 
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      await user.update({
        username,
        primaryEmailAddressId: email,
      });

      console.log("Profile updated successfully!");
      router.back(); 
    } catch (error) {
      console.error("Error updating profile:", error);
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

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-2xl font-bold text-center mb-6">Edit Profile</Text>
      <TouchableOpacity onPress={handleImagePick} className="items-center mb-6">
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

      <TextInput
        className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        className="h-12 border border-gray-400 rounded-lg px-4 mb-4"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="h-12 border border-gray-400 rounded-lg px-4 mb-6"
        placeholder="Password (Optional)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleUpdateProfile}
        className="bg-blue-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white text-lg">Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;