import { useState } from "react";

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

  function handleKeyDown(e) {
    if (e.key === "Enter") searchLocation();
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
    <div className="mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={searchLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {results.length > 0 && (
        <ul className="bg-white border border-gray-200 rounded-xl mt-2 shadow-sm overflow-hidden">
          {results.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelect(result)}
              className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b last:border-0"
            >
              {result.name}, {result.admin1 && `${result.admin1}, `}{result.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}