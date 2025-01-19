import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { THEME_COLORS } from "../constants/config";
import { useEffect } from "react";
import { Stack } from "expo-router";
import HomeScreen from "../app/(app)/home";

export default function AppLayout() {
  //   const { isAuthenticated, isLoading } = useAuthContext();
  // const router = useRouter();
  // const isAuthenticated = false;
  // const isLoading = false;

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.replace("/auth/login");
  //   }
  // }, [isAuthenticated, isLoading]);

  // if (isLoading) {
  //   return null; // Or a loading spinner
  // }

  // const StackLayout = () => {
  //   return (
  //     <Stack>
  //       <Stack.Screen name="Home" component={HomeScreen}
  //     </Stack>
  //   );
  // }
  return (
  
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME_COLORS.primary,
        tabBarInactiveTintColor: THEME_COLORS.secondary,
        tabBarStyle: {
          borderTopColor: "#e2e8f0",
          backgroundColor: "#fff",
        },
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        headerTintColor: "red",
        headerShown: false,
        // tabBarActiveBackgroundColor: "#000",
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="books/index"
        options={{
          title: "Books",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loans/index"
        options={{
          title: "Loans",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
