import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { styles } from "@/styles/create.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Create() {
  const router = useRouter();
  const user = useUser();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "livePhotos"],
      allowsEditing: true,
      // aspect: [4, 3],
      cameraType: ImagePicker.CameraType.front,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);
  const createPost = useMutation(api.posts.createPost);

  const handleShare = async () => {
    if (!selectedImage) return;

    setIsSharing(true);
    try {
      const upUrl = await generateUploadUrl();
      const res = await FileSystem.uploadAsync(upUrl, selectedImage, {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        // mimeType: "image/*",
      });
      if (res.status !== 200) throw new Error("Upload failed");
      const { storageId } = JSON.parse(res.body);
      await createPost({
        storageId,
        caption,
      });
      router.push("/(tabs)");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <View style={{ width: 28 }} />
        </View>
        <TouchableOpacity
          style={styles.emptyImageContainer}
          onPress={pickImage}
        >
          <Ionicons name="image-outline" size={48} color={COLORS.gray} />
          <Text style={styles.emptyImageText}>Tab to select and image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.contentContainer}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null);
              setCaption("");
            }}
            disabled={isSharing}
          >
            <Ionicons
              name="close-outline"
              size={28}
              color={isSharing ? COLORS.gray : COLORS.white}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            onPress={handleShare}
            disabled={isSharing || !selectedImage}
            style={[
              styles.shareButton,
              isSharing && styles.shareButtonDisabled,
            ]}
          >
            {isSharing ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Text style={styles.shareText}>Share</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.content, isSharing && styles.contentDisabled]}>
            {/* image section */}
            <View style={styles.imageSection}>
              <Image
                source={selectedImage}
                style={styles.previewImage}
                contentFit="cover"
                transition={200}
              />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
                disabled={isSharing}
              >
                <Ionicons name="image-outline" size={20} color={COLORS.white} />
                <Text style={styles.changeImageText}>Change</Text>
              </TouchableOpacity>
            </View>
            {/* input section */}
            <View style={styles.inputSection}>
              <View style={styles.captionContainer}>
                <Image
                  source={user?.user?.imageUrl}
                  style={styles.userAvatar}
                  contentFit="cover"
                  transition={200}
                />
                <TextInput
                  style={styles.captionInput}
                  placeholder="Write a caption"
                  placeholderTextColor={COLORS.gray}
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
