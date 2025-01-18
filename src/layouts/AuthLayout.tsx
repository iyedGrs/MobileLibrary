import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  //   const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const isAuthenticated = false;
  const isLoading = false;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return null; // Or a loading spinner
  }
  return (
    <>
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
          headerShown: false, // Hides headers for all auth screens
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </>
  );
}
