export default function WeatherDetails({ weather }) {
  const { pressure, humidity, temperature } = weather.current;

  return (
    <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Current Conditions
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-gray-800">{pressure.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">hPa</p>
          <p className="text-xs text-gray-400">Pressure</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{humidity.toFixed(0)}%</p>
          <p className="text-xs text-gray-500 mt-1">Humidity</p>
          <p className="text-xs text-gray-400">Relative</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800">{temperature.toFixed(1)}°C</p>
          <p className="text-xs text-gray-500 mt-1">Temp</p>
          <p className="text-xs text-gray-400">Celsius</p>
        </div>
      </div>
    </div>
  );
}