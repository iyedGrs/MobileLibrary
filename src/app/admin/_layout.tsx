import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function AdminLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Drawer
        // screenOptions={{
        //   header: () => (
        //     <View className="p-5 bg-gray-100 border-b border-gray-300 items-center">
        //       <Image
        //         source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URL
        //         className="w-16 h-16 rounded-full mb-2"
        //       />
        //       <Text className="text-lg font-bold">Isabella Joanna</Text>
        //     </View>
        //   ),
        // }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="EditBook"
          options={{
            drawerLabel: () => null,
            title: 'Edit Book',
          }}
        />
        <Drawer.Screen
          name="EditProfile"
          options={{
            drawerLabel: () => null,
            title: 'Edit Profile',
          }}
        />
        <Drawer.Screen
          name="ManageBooks"
          options={{
            drawerLabel: () => null,
            title: 'Manage Books',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
