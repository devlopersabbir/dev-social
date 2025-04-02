import { styles } from "@/styles/feed.styles";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  imageUrl: string;
  username: string;
};
const Story = ({ imageUrl, username }: Props) => {
  return (
    <TouchableOpacity style={styles.storyWrapper}>
      <View style={styles.storyRing}>
        <Image source={imageUrl} style={styles.storyAvatar} />
      </View>
      <Text style={styles.storyUsername}>{username}</Text>
    </TouchableOpacity>
  );
};
export default Story;
