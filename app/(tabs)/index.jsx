import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { fetchWeatherData } from "../../src/services/weatherService";
import { calculateRisk, riskConfig } from "../../src/utils/riskModel";
import { loadUserProfile } from "../../src/utils/storage";
import RiskCard from "../../src/components/RiskCard";
import WeatherDetails from "../../src/components/WeatherDetails";
import LocationSearch from "../../src/components/LocationSearch";
import ForecastStrip from "../../src/components/ForecastStrip";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [joints, setJoints] = useState([]);

  // On mount, load the saved profile and auto-load weather for the saved
  // location so repeat opens need no manual search.
  useEffect(() => {
    loadUserProfile().then((profile) => {
      if (!profile) return;
      if (profile.joints) setJoints(profile.joints);
      if (profile.location) {
        setLocation(profile.location);
        loadWeather(profile.location);
      }
    });
  }, []);

  function loadWeather(coords) {
    setLoading(true);
    setError(null);

    fetchWeatherData(coords.latitude, coords.longitude)
      .then((data) => {
        setWeather(data);
        const riskLevel = calculateRisk(
          data.current.pressure,
          data.current.humidity,
          data.current.temperature,
          data.pressureDelta
        );
        setRisk(riskConfig[riskLevel]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  function handleLocationSelect(selectedLocation) {
    setLocation(selectedLocation);
    loadWeather(selectedLocation);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
        <Text style={styles.title}>JointCast</Text>

        <LocationSearch onLocationSelect={handleLocationSelect} />

        {loading && (
          <ActivityIndicator
            style={styles.loading}
            color="#2563eb"
            size="large"
          />
        )}
        {error && <Text style={styles.error}>{error}</Text>}

        {location && !loading && weather && (
          <View>
            <Text style={styles.locationName}>{location.name}</Text>
            <RiskCard risk={risk} />
            <ForecastStrip
              forecast={weather.forecast}
              calculateRisk={calculateRisk}
            />
            <WeatherDetails weather={weather} />
          </View>
        )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  content: {
    padding: 24,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    color: "#2563eb",
    marginTop: 16,
    marginBottom: 32,
  },
  loading: {
    marginVertical: 16,
  },
  error: {
    textAlign: "center",
    color: "#ef4444",
    marginVertical: 8,
  },
  locationName: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 16,
  },
});
