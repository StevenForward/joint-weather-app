import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Log() {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Log</Text>
        <Text style={styles.description}>
          Track how you actually feel each day and compare it against the
          weather-based risk outlook, building a personal picture of your own
          patterns over time.
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
