// App.tsx
import React, { useEffect } from "react";
import { LoanProvider } from "../store/LoansContext"; // Vérifiez que le chemin d'importation est correct
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { THEME_COLORS } from "../constants/config";
// import { requestPermissions } from "../BrodcastReceiver/backgroundTasks";

const App = () => {
  // useEffect(() => {
  //   requestPermissions();
  // }, []);
  return (
    <LoanProvider>
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
    </LoanProvider>
  );
};

export default App;
