import { Link } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Hello</Text>
      <Link href="/notification">Notification Page</Link>
      <Link href="/profile">Profile Page</Link>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
