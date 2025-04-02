import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/feed.styles";
import { useAuth } from "@clerk/clerk-react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { Image } from "expo-image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NoPostFound from "./_components/no-post-found";
import Loader from "./_components/loader";
import Story from "./_components/story";
import Post from "./_components/post";

export default function Index() {
  const { signOut } = useAuth();
  const posts = useQuery(api.posts.getFeedPosts, "skip");

  if (posts === undefined) return <Loader />;
  if (posts?.length === 0) return <NoPostFound />;

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dev Social</Text>
        <TouchableOpacity onPress={() => signOut()}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {/* story */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.storiesContainer}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => (
          <Story
            key={i}
            imageUrl="https://avatars.githubusercontent.com/u/82939905?v=4"
            username="developersabbir"
          />
        ))}
      </ScrollView>
      {posts && posts.map((post, i) => <Post key={i} post={post} />)}
    </View>
  );
}
