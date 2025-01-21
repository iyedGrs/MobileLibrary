import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import CustomDrawerContent from "@/Components/CustomDrawerContent";

export default function AdminLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f5f5f5",
            width: 280,
          },
          drawerActiveBackgroundColor: "#e0e0e0",
          drawerActiveTintColor: "#2196F3",
          drawerInactiveTintColor: "#333",
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: "Profile",
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: "Settings",
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="EditBook"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Edit Book",
          }}
        />
        <Drawer.Screen
          name="EditProfile"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Edit Profile",
          }}
        />
        <Drawer.Screen
          name="ManageBooks"
          options={{
            drawerItemStyle: { display: "none" },
            title: "Manage Books",
          }}
        />
        <Drawer.Screen
          name="addBook"
          options={{
            drawerItemStyle: { display: "none" }, // This will hide it from the drawer
            title: "Add Book",
          }}
        />

        <Drawer.Screen
          name="UserRequests"
          options={{
            drawerItemStyle: { display: "none" }, // This will hide it from the drawer
            title: "UserRequests",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
