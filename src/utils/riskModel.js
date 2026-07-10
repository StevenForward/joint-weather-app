// Weights based on research correlations
// Pressure drop is the strongest predictor, followed by humidity and cold temp

export function calculateRisk(pressure, humidity, temperature, pressureDelta) {
  let score = 0;

  // --- Pressure drop (strongest predictor, most heavily weighted) ---
  // pressureDelta = today's avg minus yesterday's avg, so a drop is negative.
  if (pressureDelta < -8) score += 3;
  else if (pressureDelta < -4) score += 2;
  else if (pressureDelta < -1) score += 1;

  // --- Absolute pressure (minor secondary factor) ---
  if (pressure < 1005) score += 1;

  // --- Humidity ---
  if (humidity > 80) score += 2;
  else if (humidity > 65) score += 1;

  // --- Temperature (cold increases stiffness) ---
  if (temperature < 5) score += 2;
  else if (temperature < 13) score += 1;

  // --- Map score to risk level ---
  if (score >= 5) return "high";
  if (score >= 3) return "moderate";
  return "low";
}

export const riskConfig = {
  low: {
    label: "Low Risk",
    color: "green",
    message: "Weather conditions today are unlikely to affect joint comfort.",
    advice: "A good day for normal activity. Stay hydrated and keep moving!",
  },
  moderate: {
    label: "Moderate Risk",
    color: "yellow",
    message: "Some weather conditions today may contribute to joint discomfort.",
    advice: "Consider gentle warm-up before activity, and keep any pain relief accessible just in case.",
  },
  high: {
    label: "High Risk",
    color: "red",
    message: "Today's weather conditions are associated with higher chances of joint discomfort.",
    advice: "Pace your activity, dress warmly, and have any needed items within easy reach.",
  },
};