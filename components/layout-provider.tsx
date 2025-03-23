import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

const LayoutProvider = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segment = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const isAuthScreen = segment[0] === "(auth)";

    if (!isSignedIn && !isAuthScreen) return router.replace("/(auth)/login");
    if (isSignedIn && isAuthScreen) return router.replace("/(tabs)");
  }, [isLoaded, isSignedIn, segment]);

  if (!isLoaded) return;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};
export default LayoutProvider;
