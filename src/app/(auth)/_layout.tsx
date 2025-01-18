import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Log in",
        }}
      />
    </Stack>
  );
}
