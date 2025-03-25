import { useAuth, useSession } from "@clerk/clerk-expo";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut({
      redirectUrl: "/(auth)/login",
    });
  };

  return (
    <View>
      <Text>Profile</Text>
      <View>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            margin: 50,
            borderWidth: 2,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
