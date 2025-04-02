import { COLORS } from "@/constants/theme";
import { Text, View } from "react-native";

const NoPostFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: COLORS.primary,
        }}
      >
        No post yet
      </Text>
    </View>
  );
};
export default NoPostFound;
