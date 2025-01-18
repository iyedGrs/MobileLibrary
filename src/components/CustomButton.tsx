import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: string;
  textStyle?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      className={`  p-4 rounded-lg ${containerStyle}`}
      onPress={onPress}
    >
      <Text className={`text-white font-bold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
