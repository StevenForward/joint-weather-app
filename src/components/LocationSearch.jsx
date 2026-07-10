import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function LocationSearch({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchLocation() {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setError("No locations found. Try a different search.");
        setResults([]);
      } else {
        setResults(data.results);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(result) {
    setResults([]);
    setQuery("");
    onLocationSelect({
      name: `${result.name}, ${result.country}`,
      latitude: result.latitude,
      longitude: result.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchLocation}
          placeholder="Search for a city..."
          placeholderTextColor="#9ca3af"
          returnKeyType="search"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={searchLocation}>
          {loading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {results.length > 0 && (
        <View style={styles.results}>
          {results.map((result, index) => (
            <TouchableOpacity
              key={result.id}
              onPress={() => handleSelect(result)}
              style={[
                styles.resultItem,
                index < results.length - 1 && styles.resultBorder,
              ]}
            >
              <Text style={styles.resultText}>
                {result.name}
                {result.admin1 ? `, ${result.admin1}` : ""}, {result.country}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: "#ffffff",
    color: "#111827",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 72,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
  },
  results: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    marginTop: 8,
    overflow: "hidden",
  },
  resultItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  resultText: {
    fontSize: 14,
    color: "#374151",
  },
});
