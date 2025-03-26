import { Login } from "@/@types";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default function TabLayout() {
  const { user, isSignedIn, isLoaded } = useUser();

  const createUser = useMutation(api.users.createUser);
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      if (!user.primaryEmailAddress?.emailAddress || !user.imageUrl)
        return alert("email address not found!");

      const inputData: Login = {
        fullname: user.fullName || "",
        username:
          user.username ||
          user.primaryEmailAddress.emailAddress?.trim()?.split("@")[0] ||
          "",
        email: user.primaryEmailAddress?.emailAddress,
        image: user.imageUrl,
        clerkId: user.id,
      };
      if (inputData) {
        createUser(inputData);
      }
    }
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="bookmarks" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ size }) => (
            <Ionicons name="create" size={size} color={COLORS.primary} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
