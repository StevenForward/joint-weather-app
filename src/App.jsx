import { useState, useEffect } from "react";
import { fetchWeatherData } from "./services/weatherService";
import { calculateRisk, riskConfig } from "./utils/riskModel";
import RiskCard from "./components/RiskCard";
import WeatherDetails from "./components/WeatherDetails";
import LocationSearch from "./components/LocationSearch";

function App() {
  const [weather, setWeather] = useState(null);
  const [risk, setRisk] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  function loadWeather(coords) {
    setLoading(true);
    setError(null);

    fetchWeatherData(coords.latitude, coords.longitude)
      .then((data) => {
        setWeather(data);
        const riskLevel = calculateRisk(
          data.current.pressure,
          data.current.humidity,
          data.current.temperature
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
    <div className="min-h-screen bg-gray-50 p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Joint Weather App
      </h1>

      <LocationSearch onLocationSelect={handleLocationSelect} />

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {location && !loading && weather && (
        <>
          <p className="text-center text-gray-500 text-sm mb-4">{location.name}</p>
          <RiskCard risk={risk} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </div>
  );
}

export default App;