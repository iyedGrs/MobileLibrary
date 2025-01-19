import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Admin Dashboard",
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          headerShown: true,
          title: "Users",
        }}
      />
    </Stack>
  );
}
