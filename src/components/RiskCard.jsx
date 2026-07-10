import { View, Text, StyleSheet } from "react-native";

const colorMap = {
  green: {
    bg: "#f0fdf4",
    border: "#4ade80",
    badgeBg: "#dcfce7",
    badgeText: "#166534",
    dot: "#22c55e",
  },
  yellow: {
    bg: "#fefce8",
    border: "#facc15",
    badgeBg: "#fef9c3",
    badgeText: "#854d0e",
    dot: "#eab308",
  },
  red: {
    bg: "#fef2f2",
    border: "#f87171",
    badgeBg: "#fee2e2",
    badgeText: "#991b1b",
    dot: "#ef4444",
  },
};

export default function RiskCard({ risk }) {
  const colors = colorMap[risk.color];

  return (
    <View
      style={[styles.card, { backgroundColor: colors.bg, borderColor: colors.border }]}
    >
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: colors.dot }]} />
        <View style={[styles.badge, { backgroundColor: colors.badgeBg }]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>
            {risk.label}
          </Text>
        </View>
      </View>

      <Text style={styles.message}>{risk.message}</Text>

      <View style={styles.divider}>
        <Text style={styles.sectionLabel}>What to do</Text>
        <Text style={styles.advice}>{risk.advice}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  message: {
    color: "#374151",
    fontSize: 16,
    marginBottom: 16,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  advice: {
    color: "#374151",
    fontSize: 14,
  },
});
