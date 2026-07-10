import { View, Text, ScrollView, StyleSheet } from "react-native";

// Same color values as RiskCard.jsx's colorMap (keyed by color name).
const colorMap = {
  green: { dot: "#22c55e", text: "#166534" },
  yellow: { dot: "#eab308", text: "#854d0e" },
  red: { dot: "#ef4444", text: "#991b1b" },
};

// Map the risk level returned by calculateRisk to a color + display label.
const riskMap = {
  low: { color: "green", label: "Low" },
  moderate: { color: "yellow", label: "Moderate" },
  high: { color: "red", label: "High" },
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dayLabel(dateStr, index) {
  if (index === 0) return "Today";
  const date = new Date(`${dateStr}T00:00:00`);
  return WEEKDAYS[date.getDay()];
}

export default function ForecastStrip({ forecast, calculateRisk }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.strip}
    >
      {forecast.map((day, index) => {
        // No pressureDelta for future days, so pass 0.
        const level = calculateRisk(
          day.avgPressure,
          day.avgHumidity,
          day.avgTemperature,
          0
        );
        const risk = riskMap[level];
        const colors = colorMap[risk.color];

        return (
          <View key={day.date} style={styles.card}>
            <Text style={styles.day}>{dayLabel(day.date, index)}</Text>
            <View style={[styles.dot, { backgroundColor: colors.dot }]} />
            <Text style={[styles.riskLabel, { color: colors.text }]}>
              {risk.label}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  strip: {
    gap: 10,
    paddingVertical: 16,
  },
  card: {
    width: 72,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    gap: 8,
  },
  day: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  riskLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});
