import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

const CustomDrawerContent = (props: any) => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {user?.imageUrl ? (
          <Image source={{ uri: user.imageUrl }} style={styles.headerImage} />
        ) : (
          <View style={[styles.headerImage, styles.placeholderImage]}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>
        )}
        <View style={styles.overlay} />
        <View style={styles.userInfo}>
          <Text style={styles.headerText}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.emailText}>
            {user?.emailAddresses[0]?.emailAddress}
          </Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <DrawerItemList {...props} />
          <View style={styles.separator} />
          <DrawerItem
            label="Logout"
            onPress={handleLogout}
            icon={({ color, size }) => (
              <Ionicons name="log-out-outline" size={size} color={color} />
            )}
          />
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 200,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  placeholderImage: {
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  userInfo: {
    zIndex: 1,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  emailText: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
});

export default CustomDrawerContent;
