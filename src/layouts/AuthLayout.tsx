import { useAuth } from "@clerk/clerk-expo";
import { Redirect, router, Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  //   const { isAuthenticated, isLoading } = useAuthContext();
  // const router = useRouter();
  const { isSignedIn, isLoaded, userId } = useAuth();
  console.log("isSignedIn", isSignedIn);
  console.log("isLoaded", userId);

  // if (!isSignedIn) {
  //   return <Redirect href="/auth/login" />;
  // }
  // if (isSignedIn) {
  //   <Redirect href="/home" />;
  // }
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/home");
    }
  }, [isSignedIn]);
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
          headerShown: false, // Hides headers for all auth screens
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    
  );
}
