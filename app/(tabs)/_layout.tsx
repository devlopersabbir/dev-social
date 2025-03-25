import { Login } from "@/@types";
import { defaultLogin } from "@/constants";
import { COLORS } from "@/constants/theme";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [login, setLogin] = useState<Login>(defaultLogin);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // setLogin({
      //   fullname: user.fullName,
      //   username: user.username || user.username?.trim()?.split("@")[0],
      //   email: user.emailAddresses ,
      //   image: user.imageUrl,
      //   clerkId: user.id,
      // });
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
