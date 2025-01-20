import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkProvider, ClerkLoaded, useUser } from "@clerk/clerk-expo";
import "../../global.css";
import { tokenCache } from "../cache";
import React, { useEffect } from 'react';
const publishKeyExpo = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!publishKeyExpo) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishKeyExpo}>
      <ClerkLoaded>
        <RoleBasedRouting />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

function RoleBasedRouting() {
  const { user, isLoaded } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    
    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page
      router.replace("/auth/login");
    } else if (user) {
      const userRole = user.publicMetadata.role as string || "member";
      const inAdminGroup = segments[0] === "admin";
      const inAppGroup = segments[0] === "(app)";

      if (userRole === "admin" && !inAdminGroup) {
        // Redirect admin to admin section
        router.replace("/admin");
      } else if (userRole === "member" && !inAppGroup) {
        // Redirect member to app section
        router.replace("/(app)/home");
      }
    }
  }, [user, segments, isLoaded]);

  return <Slot />;
}
