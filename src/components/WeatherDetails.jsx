import { View, Text, StyleSheet } from "react-native";

export default function WeatherDetails({ weather }) {
  const { pressure, humidity, temperature } = weather.current;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Current Conditions</Text>
      <View style={styles.grid}>
        <View style={styles.cell}>
          <Text style={styles.value}>{pressure.toFixed(0)}</Text>
          <Text style={styles.unit}>hPa</Text>
          <Text style={styles.caption}>Pressure</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.value}>{humidity.toFixed(0)}%</Text>
          <Text style={styles.unit}>Humidity</Text>
          <Text style={styles.caption}>Relative</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.value}>{temperature.toFixed(1)}°C</Text>
          <Text style={styles.unit}>Temp</Text>
          <Text style={styles.caption}>Celsius</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
  },
  unit: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  caption: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
