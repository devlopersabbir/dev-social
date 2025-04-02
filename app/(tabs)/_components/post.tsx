import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  post: any;
};
const Post = ({ post }: Props) => {
  return (
    <View style={styles.post}>
      {/* post header */}
      <View style={styles.postHeader}>
        <Link href={`/(tabs)/notification`}>
          <TouchableOpacity style={styles.postHeaderLeft}>
            <Image
              source={post.author?.image}
              style={styles.postAvatar}
              contentFit="cover"
              transition={300}
              cachePolicy={"memory-disk"}
            />
            <Text style={styles.postUsername}>{post.user?.username}</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <TouchableOpacity>
        <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white} />
      </TouchableOpacity>
      {/* post image */}
      <Image
        source={post.imageUlr}
        style={styles.postImage}
        contentFit="cover"
        transition={200}
        cachePolicy="memory-disk"
      />
      {/* post action */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* post info */}
      <View style={[styles.postInfo]}>{/* text... */}</View>
    </View>
  );
};

export default Post;
