import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const user = useUser();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Text>create post</Text>
    </View>
  );
}
