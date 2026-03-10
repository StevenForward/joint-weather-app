// Weights based on research correlations
// Pressure drop is the strongest predictor, followed by humidity and cold temp

export function calculateRisk(pressure, humidity, temperature) {
  let score = 0;

  // --- Pressure (most heavily weighted) ---
  // Normal range: 1013 hPa. Lower = higher risk.
  if (pressure < 1000) score += 3;
  else if (pressure < 1007) score += 2;
  else if (pressure < 1013) score += 1;

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