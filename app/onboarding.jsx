import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import LocationSearch from "../src/components/LocationSearch";
import { saveUserProfile } from "../src/utils/storage";

const JOINT_OPTIONS = [
  { key: "knees", label: "Knees" },
  { key: "ankles", label: "Ankles" },
  { key: "hips", label: "Hips" },
  { key: "wrists", label: "Wrists" },
  { key: "elbows", label: "Elbows" },
  { key: "shoulders", label: "Shoulders" },
];

export default function Onboarding() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [joints, setJoints] = useState([]);

  async function useCurrentLocation() {
    setLocating(true);
    setLocationError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationError(
          "Location permission denied. You can search for your city instead."
        );
        setLocating(false);
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = position.coords;

      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const name =
        [place?.city, place?.region].filter(Boolean).join(", ") ||
        place?.country ||
        "Current location";

      setSelectedLocation({ name, latitude, longitude });
    } catch (err) {
      setLocationError(
        "Couldn't get your location. You can search for your city instead."
      );
    } finally {
      setLocating(false);
    }
  }

  function toggleJoint(key) {
    setJoints((prev) =>
      prev.includes(key) ? prev.filter((j) => j !== key) : [...prev, key]
    );
  }

  async function finish() {
    if (joints.length === 0) return;
    await saveUserProfile({ location: selectedLocation, joints });
    router.replace("/");
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
        <StatusBar style="dark" />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Step 1 — Welcome */}
          {step === 1 && (
            <View style={styles.centered}>
              <Text style={styles.appName}>JointCast</Text>
              <Text style={styles.lead}>
                JointCast reads the weather where you are and gives you a daily
                heads-up on when conditions may stir up joint discomfort.
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setStep(2)}
              >
                <Text style={styles.primaryButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2 — Location */}
          {step === 2 && (
            <View>
              <Text style={styles.title}>Where are you?</Text>
              <Text style={styles.subtitle}>
                We use your location to pull local weather conditions.
              </Text>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={useCurrentLocation}
                disabled={locating}
              >
                {locating ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Use my current location
                  </Text>
                )}
              </TouchableOpacity>

              {locationError && (
                <Text style={styles.error}>{locationError}</Text>
              )}

              <Text style={styles.orLabel}>or search for a city</Text>
              <LocationSearch onLocationSelect={setSelectedLocation} />

              {selectedLocation && (
                <View style={styles.successBox}>
                  <Text style={styles.successLabel}>✓ Location set</Text>
                  <Text style={styles.successName}>
                    {selectedLocation.name}
                  </Text>
                </View>
              )}

              {selectedLocation && (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => setStep(3)}
                >
                  <Text style={styles.primaryButtonText}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Step 3 — Joint selection */}
          {step === 3 && (
            <View>
              <Text style={styles.title}>Which joints bother you most?</Text>
              <Text style={styles.subtitle}>Select all that apply.</Text>

              <View style={styles.grid}>
                {JOINT_OPTIONS.map((option) => {
                  const selected = joints.includes(option.key);
                  return (
                    <TouchableOpacity
                      key={option.key}
                      style={[styles.jointBox, selected && styles.jointBoxOn]}
                      onPress={() => toggleJoint(option.key)}
                    >
                      <Text
                        style={[
                          styles.jointText,
                          selected && styles.jointTextOn,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  joints.length === 0 && styles.primaryButtonDisabled,
                ]}
                onPress={finish}
                disabled={joints.length === 0}
              >
                <Text style={styles.primaryButtonText}>Done</Text>
              </TouchableOpacity>
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
    flexGrow: 1,
    padding: 24,
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appName: {
    fontSize: 36,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 16,
  },
  lead: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 16,
    minWidth: 160,
  },
  primaryButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 12,
  },
  orLabel: {
    textAlign: "center",
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 20,
    marginBottom: 8,
  },
  successBox: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#4ade80",
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
  },
  successLabel: {
    color: "#166534",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  successName: {
    color: "#111827",
    fontSize: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  jointBox: {
    width: "48%",
    paddingVertical: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginBottom: 12,
  },
  jointBoxOn: {
    borderColor: "#2563eb",
    backgroundColor: "#eff6ff",
  },
  jointText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  jointTextOn: {
    color: "#2563eb",
  },
});
