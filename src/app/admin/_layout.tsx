import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import React from "react";

export default function AdminLayout() {
  return (

    
    <><GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen 
        name="index" 
        options={{
            drawerLabel: 'Home',
            title: 'Home',
          }} />

        {/* <Drawer.Screen
          name="user/[id]" 
          options={{
            drawerLabel: 'User',
            title: 'overview',
          }} /> */}

      <Drawer.Screen
          name="Profile" 
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
          }} 
        />

      <Drawer.Screen
          name="Settings" 
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }} 
        />
      </Drawer>
    </GestureHandlerRootView>
    
    </>
  );
}
