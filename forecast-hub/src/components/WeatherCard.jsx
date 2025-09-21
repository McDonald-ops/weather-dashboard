import { useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import tzlookup from "tz-lookup";
import SearchBar from "./SearchBar";
import Forecast from "./Forecast";

/**
 * Formats Unix timestamp to local time using timezone lookup
 * 
 * Uses the tz-lookup library to determine the timezone based on coordinates,
 * then converts the timestamp to local time using Luxon DateTime.
 * Falls back to UTC if timezone lookup fails.
 * 
 * @param {number} dt - Unix timestamp in seconds
 * @param {number} lat - Latitude coordinate
 * @param {number} lon - Longitude coordinate
 * @returns {Object} Object containing localTime (DateTime) and zoneName (string)
 */
function formatDateTime(dt, lat, lon) {
  try {
    // Look up timezone from coordinates (e.g. "Africa/Lagos")
    const zoneName = tzlookup(lat, lon);
    const localTime = DateTime.fromSeconds(dt, { zone: zoneName });
    return { localTime, zoneName };
  } catch (err) {
    // Fallback to UTC if timezone lookup fails
    const localTime = DateTime.fromSeconds(dt, { zone: "utc" });
    return { localTime, zoneName: "UTC" };
  }
}

/**
 * Weather condition to background image mapping
 */
const WEATHER_BACKGROUNDS = {
  clear: { day: "/sunny.jpg", night: "/clearnight.jpg" },
  clouds: { day: "/cloud.jpg", night: "/cloud.jpg" },
  rain: { day: "/rain.jpg", night: "/rain.jpg" },
  drizzle: { day: "/rain.jpg", night: "/rain.jpg" },
  snow: { day: "/snow.jpg", night: "/snow.jpg" },
  thunderstorm: { day: "/storm.jpg", night: "/storm.jpg" },
};

/**
 * Selects appropriate background image based on weather conditions
 * 
 * Chooses from a set of weather-themed background images based on the
 * current weather condition and time of day. Only applies dynamic
 * backgrounds after user has performed a search to avoid jarring
 * transitions on initial load.
 * 
 * @param {Object} params - Selection parameters
 * @param {Array} params.weatherArray - Weather condition array from API
 * @param {string} params.iconCode - Weather icon code (e.g., "01d", "01n")
 * @param {boolean} params.hasSearched - Whether user has performed a search
 * @returns {string} Path to background image
 */
function selectBackground({ weatherArray, iconCode, hasSearched }) {
  const defaultBg = "/bg.jpeg"; // Default background for initial state
  
  // Only apply dynamic backgrounds after user search
  if (!hasSearched || !weatherArray || weatherArray.length === 0) return defaultBg;

  const main = (weatherArray[0]?.main || "").toLowerCase();
  const isNight = iconCode?.endsWith?.("n"); // Check if night icon
  
  // Get background mapping for weather condition
  const backgroundMapping = WEATHER_BACKGROUNDS[main];
  if (!backgroundMapping) return defaultBg;
  
  // Return appropriate background based on time of day
  return isNight ? backgroundMapping.night : backgroundMapping.day;
}

/**
 * Main WeatherCard component displaying current weather and forecast
 * 
 * This component renders a responsive weather dashboard card with:
 * - Current weather information with dynamic background
 * - Local time display with timezone information
 * - Weather details (humidity, wind, cloud cover)
 * - 5-day forecast with horizontal scrolling
 * - City search functionality
 * 
 * The component uses memoization for background selection and preloads
 * all background images for smooth transitions.
 * 
 * @param {Object} props - Component props
 * @param {Object|null} props.data - Weather data from API
 * @param {Function} props.onSearch - Callback for city search
 * @param {boolean} props.hasSearched - Whether user has performed a search
 * @returns {JSX.Element} Weather card component
 */
function WeatherCard({ data, onSearch, hasSearched }) {
  // Initialize default values for graceful handling of missing data
  let name = "";
  let sys = { country: "" };
  let main = { temp: 0, humidity: 0 };
  let wind = { speed: 0 };
  let weather = [{ description: "", icon: "01d" }];
  let localTime = DateTime.now();
  let zoneName = "UTC";
  let forecast = [];

  // Extract and process weather data if available
  if (data) {
    const { dt, coord } = data;
    ({ name, sys, main, wind, weather } = data);
    // Convert timestamp to local time using coordinates
    ({ localTime, zoneName } = formatDateTime(dt, coord?.lat, coord?.lon));
    forecast = data.forecast ?? [];
  }

  // Construct weather icon URL from OpenWeatherMap
  const iconCode = weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // Memoize background selection to prevent unnecessary recalculations
  const leftBg = useMemo(
    () => selectBackground({ weatherArray: weather, iconCode, hasSearched }),
    [weather, iconCode, hasSearched]
  );

  // Preload all background images for smooth transitions
  useEffect(() => {
    const imagesToPreload = [
      "/bg.jpeg",
      "/sunny.jpg",
      "/cloud.jpg",
      "/rain.jpg",
      "/snow.jpg",
      "/storm.jpg",
      "/clearnight.jpg",
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      className="flex flex-col md:flex-row w-full max-w-[700px] h-auto md:h-[400px] rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Left side - Weather display with dynamic background */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center flex flex-col justify-between p-4 md:p-6 text-white transition-all duration-700 ease-out relative"
        style={{
          backgroundImage: `url(${leftBg})`,
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        {/* Weather icon display */}
        <div className="flex justify-start relative z-10">
          <img
            src={weatherIcon}
            alt="Weather Icon"
            className="w-20 h-20 md:w-28 md:h-28 drop-shadow-lg"
          />
        </div>

        {/* Weather information display */}
        <div className="flex flex-col relative z-10">
          {/* Local time and timezone */}
          <p className="text-xs md:text-sm font-light">
            {localTime.toFormat("yyyy-LL-dd HH:mm")}
          </p>
          <p className="text-xs md:text-sm opacity-80">{zoneName}</p>

          {/* Location name and country */}
          <h2 className="text-xl md:text-2xl font-semibold mt-2">
            {name}, {sys?.country}
          </h2>

          {/* Temperature display with proper rounding */}
          <p className="text-4xl md:text-6xl font-extrabold mt-2">
            {typeof main?.temp === "number" ? Math.round(main.temp) : main?.temp}°C
          </p>
        </div>
      </div>

      {/* Right side - Weather details and controls */}
      <div className="w-full md:w-1/2 bg-black/90 text-white flex flex-col p-4 md:p-6">
        {/* Weather details grid */}
        <div className="space-y-3 md:space-y-4 text-xs md:text-sm">
          <div className="flex justify-between">
            <span>CONDITION</span>
            <span className="font-light">{weather[0]?.description}</span>
          </div>
          <div className="flex justify-between">
            <span>CLOUD</span>
            <span className="font-light">{data?.clouds?.all ?? "—"}%</span>
          </div>
          <div className="flex justify-between">
            <span>HUMIDITY</span>
            <span className="font-light">{main?.humidity}%</span>
          </div>
          <div className="flex justify-between">
            <span>WIND</span>
            <span className="font-light">{wind?.speed} m/s</span>
          </div>
        </div>

        {/* 5-day forecast display area */}
        <div className="mt-3 mb-4 flex-1">
          <Forecast forecast={forecast} />
        </div>

        {/* Search bar positioned at bottom */}
        <div className="mb-4 md:mb-6">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
