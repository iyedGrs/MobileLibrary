import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, 
        }}
      />

      <Stack.Screen
        name="EditProfile" 
        options={{
          title: "Edit Profile", 
        }}
      />
    </Stack>
  );
}
