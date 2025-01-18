import { Slot } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import "../../global.css";
import { tokenCache } from "../cache";
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
        <Slot />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
