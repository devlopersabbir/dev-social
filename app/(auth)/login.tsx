import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.style";
import { useSSO, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const loginHandler = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (setActive && createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err) {
      alert("fail to signup ");
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Dev Social</Text>
        <Text style={styles.tagline}>Don't miss Anything</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-bg-2.png")}
          alt="auth image"
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      {/* login section */}
      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          activeOpacity={0.9}
          onPress={loginHandler}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue With Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By Contributing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
