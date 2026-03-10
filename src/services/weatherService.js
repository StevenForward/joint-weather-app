const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherData(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    hourly: "surface_pressure,relative_humidity_2m,temperature_2m",
    forecast_days: 1,
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();
  return parseWeatherData(data);
}

function parseWeatherData(data) {
  const hours = data.hourly.time.length;

  // Average the values across the day
  const avgPressure = average(data.hourly.surface_pressure);
  const avgHumidity = average(data.hourly.relative_humidity_2m);
  const avgTemperature = average(data.hourly.temperature_2m);

  // Also grab the current hour's values
  const currentHour = new Date().getHours();
  const currentPressure = data.hourly.surface_pressure[currentHour];
  const currentHumidity = data.hourly.relative_humidity_2m[currentHour];
  const currentTemperature = data.hourly.temperature_2m[currentHour];

  return {
    current: {
      pressure: currentPressure,
      humidity: currentHumidity,
      temperature: currentTemperature,
    },
    daily: {
      avgPressure,
      avgHumidity,
      avgTemperature,
    },
  };
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}