import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

function ClerkAuthProvider() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Slot />
    </ClerkProvider>
  );
}

export default ClerkAuthProvider;
