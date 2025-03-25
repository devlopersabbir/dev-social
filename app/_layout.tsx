import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LayoutProvider from "@/components/layout-provider";
import BaseProvider from "@/providers/base-provider";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
import { ConvexReactClient } from "convex/react";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL!;

if (!publishableKey?.trim() || !convexUrl.trim()) {
  console.error("not found!");
}
const convex = new ConvexReactClient(convexUrl);
export default function () {
  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <BaseProvider convex={convex}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <LayoutProvider />
            </SafeAreaView>
          </SafeAreaProvider>
        </BaseProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
