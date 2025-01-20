import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from "react";

export default function AdminLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Écran Home */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
          }}
        />

        {/* Écran Profile */}
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }}
        />

        {/* Écran Settings */}
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />

        {/* Exclure EditBook et ManageBooks du Drawer */}
        <Drawer.Screen
          name="EditBook"
          options={{
            drawerLabel: () => null, // Masque l'écran du Drawer
            title: 'Edit Book',
          }}
        />

<Drawer.Screen
          name="EditProfile"
          options={{
            drawerLabel: () => null, // Masque l'écran du Drawer
            title: 'Edit Profile',
          }}
        />
        <Drawer.Screen
          name="ManageBooks"
          options={{
            drawerLabel: () => null, // Masque l'écran du Drawer
            title: 'Manage Books',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}