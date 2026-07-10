import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Learn() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Learn</Text>
        <Text style={styles.description}>
          Plain-language explanations of how barometric pressure, humidity, and
          temperature relate to joint discomfort — plus the research behind the
          risk model.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 22,
  },
});
