const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherData(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    hourly: "surface_pressure,relative_humidity_2m,temperature_2m",
    past_days: 1,
    forecast_days: 7,
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
  const times = data.hourly.time;

  // Group each hourly index by its calendar date (YYYY-MM-DD).
  // With past_days: 1, dates[0] is yesterday and dates[1] is today.
  const dayMap = new Map();
  for (let i = 0; i < times.length; i++) {
    const date = times[i].slice(0, 10);
    if (!dayMap.has(date)) dayMap.set(date, []);
    dayMap.get(date).push(i);
  }
  const dates = [...dayMap.keys()];

  // Average a given hourly field over a set of hour indices.
  const avgField = (field, indices) =>
    average(indices.map((i) => data.hourly[field][i]));

  const yesterdayIndices = dayMap.get(dates[0]);
  const todayIndices = dayMap.get(dates[1]);

  // Pressure delta: today's average minus yesterday's average.
  // A pressure drop is therefore negative.
  const pressureDelta =
    avgField("surface_pressure", todayIndices) -
    avgField("surface_pressure", yesterdayIndices);

  // Weekly outlook: the 7 forecast days (today onward), skipping yesterday.
  const forecast = dates.slice(1, 8).map((date) => {
    const indices = dayMap.get(date);
    return {
      date,
      avgPressure: avgField("surface_pressure", indices),
      avgHumidity: avgField("relative_humidity_2m", indices),
      avgTemperature: avgField("temperature_2m", indices),
    };
  });

  // Current hour's values (indexed within today's block).
  const currentHour = new Date().getHours();
  const currentIndex =
    todayIndices[currentHour] ?? todayIndices[todayIndices.length - 1];

  return {
    current: {
      pressure: data.hourly.surface_pressure[currentIndex],
      humidity: data.hourly.relative_humidity_2m[currentIndex],
      temperature: data.hourly.temperature_2m[currentIndex],
    },
    pressureDelta,
    forecast,
  };
}

function average(arr) {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}
