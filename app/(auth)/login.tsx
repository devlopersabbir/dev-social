import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.style";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
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
        <TouchableOpacity style={styles.googleButton} activeOpacity={0.9}>
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
