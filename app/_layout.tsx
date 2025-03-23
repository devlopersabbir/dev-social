import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LayoutProvider from "@/components/layout-provider";
import BaseProvider from "@/providers/base-provider";

export default function Layout() {
  return (
    <BaseProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <LayoutProvider />
        </SafeAreaView>
      </SafeAreaProvider>
    </BaseProvider>
  );
}
