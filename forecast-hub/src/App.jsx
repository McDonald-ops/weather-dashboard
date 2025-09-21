import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import fetchWeather from "./components/fetchWeather";
import ErrorMessage from "./components/ErrorMessage";

/**
 * Main App component for the Weather Dashboard
 * 
 * This component manages the overall application state including:
 * - Current weather data and forecast information
 * - Error handling for API failures
 * - User search state tracking
 * - Default location loading (Lagos, Nigeria)
 * 
 * The app provides a responsive weather dashboard with:
 * - Current weather display with dynamic backgrounds
 * - 5-day weather forecast
 * - City search functionality
 * - Error notifications with auto-dismiss
 * 
 * @component
 * @returns {JSX.Element} The main application interface
 */
function App() {
  // State management for weather data, errors, and user interaction tracking
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Tracks if user has performed a search

  /**
   * Initialize app with default location (Lagos, Nigeria)
   * This is not considered a user search, so hasSearched remains false
   */
  useEffect(() => {
    getWeather("Lagos", false);
  }, []);

  /**
   * Fetches weather data for a given city and updates application state
   * 
   * @param {string} city - The city name to fetch weather for
   * @param {boolean} isUserSearch - Whether this is a user-initiated search
   * @returns {Promise<void>}
   */
  const getWeather = async (city, isUserSearch = false) => {
    // Clear any existing errors before making new request
    setError("");
    
    try {
      // Fetch weather data from OpenWeatherMap API
      const data = await fetchWeather(city);
      setWeather(data);
      
      // Only mark as searched if this was a user-initiated search
      if (isUserSearch) setHasSearched(true);
    } catch (err) {
      // Handle errors gracefully with fallback data for default location
      if (!isUserSearch && city.toLowerCase() === "lagos") {
        // Provide fallback data for Lagos if API fails on initial load
        setWeather({
          dt: Math.floor(Date.now() / 1000),
          coord: { lat: 6.5244, lon: 3.3792 }, // Lagos coordinates
          name: "Lagos",
          sys: { country: "NG" },
          main: { temp: 0, humidity: 0 },
          wind: { speed: 0 },
          weather: [{ description: "—", icon: "01d" }],
          clouds: { all: 0 },
          forecast: [], // Empty forecast fallback
        });
      } else {
        // Show error message for user searches or non-default locations
        setError(err.message || "Something went wrong");
      }
    }
  };

  return (
    <div
      className="
        min-h-screen w-full 
        flex flex-col items-center justify-center 
        bg-center bg-no-repeat p-4 md:p-6
      "
      style={{
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* Error notification component - shows API errors and invalid city messages */}
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      
      {/* Main weather card component with search functionality */}
      <WeatherCard
        data={weather}
        onSearch={(city) => getWeather(city, true)}
        hasSearched={hasSearched}
      />
    </div>
  );
}

export default App;
