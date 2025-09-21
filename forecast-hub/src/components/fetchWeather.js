/**
 * Processes 3-hourly forecast data for a single day into daily summary
 * 
 * @param {Array} items - Array of 3-hourly forecast items for one day
 * @returns {Object} Daily summary with min/max temps, humidity, and predominant weather
 */
function processDayForecast(items) {
  let minTemp = Number.POSITIVE_INFINITY;
  let maxTemp = Number.NEGATIVE_INFINITY;
  let humiditySum = 0;
  let count = 0;
  const weatherCount = {}; // Track weather condition frequency

  // Analyze all 3-hourly entries for this day
  for (const item of items) {
    const temp = item.main?.temp;
    if (typeof temp === "number") {
      minTemp = Math.min(minTemp, temp);
      maxTemp = Math.max(maxTemp, temp);
    }
    humiditySum += item.main?.humidity ?? 0;
    count += 1;

    // Create unique key for weather condition tracking
    const weather = item.weather[0];
    const key = `${weather.main}|${weather.icon}|${weather.description}`;
    weatherCount[key] = (weatherCount[key] || 0) + 1;
  }

  // Determine predominant weather condition for the day
  const predominantKey = Object.keys(weatherCount).reduce((a, b) =>
    weatherCount[a] > weatherCount[b] ? a : b
  );
  const [predMain, predIcon, predDesc] = predominantKey.split("|");

  return {
    minTemp: Number.isFinite(minTemp) ? Math.round(minTemp) : null,
    maxTemp: Number.isFinite(maxTemp) ? Math.round(maxTemp) : null,
    humidity: count ? Math.round(humiditySum / count) : null,
    main: predMain,
    icon: predIcon,
    description: predDesc,
  };
}

/**
 * Fetches current weather and 5-day forecast data from OpenWeatherMap API
 * 
 * This function makes parallel API calls to get both current weather conditions
 * and 5-day forecast data for a specified city. It processes the 3-hourly
 * forecast data into daily summaries with min/max temperatures and predominant
 * weather conditions.
 * 
 * @param {string} city - The city name to fetch weather data for
 * @returns {Promise<Object>} Weather data object containing:
 *   - Current weather information (temp, humidity, wind, etc.)
 *   - 5-day forecast array with daily summaries
 *   - Location information (name, coordinates, timezone)
 * @throws {Error} When API key is missing or city is not found
 * 
 * @example
 * try {
 *   const weatherData = await fetchWeather("London");
 *   console.log(weatherData.name); // "London"
 *   console.log(weatherData.forecast.length); // 5
 * } catch (error) {
 *   console.error("Failed to fetch weather:", error.message);
 * }
 */
async function fetchWeather(city) {
  // Validate API key from environment variables
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Missing OpenWeather API key");

  // Construct API URLs for current weather and 5-day forecast
  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    // Make parallel API calls for better performance
    const [curRes, fRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    // Handle current weather API response
    if (!curRes.ok) throw new Error("City not found");
    
    // Handle forecast API response - graceful degradation if forecast fails
    if (!fRes.ok) {
      // If forecast fails, still return current weather but with empty forecast
      const currentData = await curRes.json();
      currentData.forecast = [];
      return currentData;
    }

    // Parse both API responses
    const currentData = await curRes.json();
    const forecastData = await fRes.json();

    // Process 3-hour forecast list into daily summaries (next 5 days)
    const list = forecastData.list || [];

    // Group 3-hourly forecasts by date (YYYY-MM-DD format)
    // Note: dt_txt is in UTC but works fine for grouping by date
    const groups = {};
    for (const item of list) {
      // item.dt_txt format: "2025-08-27 12:00:00"
      const date = item.dt_txt.split(" ")[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    }

    // Get today's date string to exclude it from forecast
    const todayStr = new Date(currentData.dt * 1000)
      .toISOString()
      .split("T")[0];

    // Build ordered array of next 5 dates (excluding today)
    const dates = Object.keys(groups)
      .filter((d) => d !== todayStr)
      .sort()
      .slice(0, 5);

    // Process each day's 3-hourly data into daily summary
    const daily = dates.map((date) => {
      const items = groups[date];
      const daySummary = processDayForecast(items);
      
      return {
        date, // YYYY-MM-DD format
        ...daySummary,
      };
    });

    // Attach processed forecast to current weather data
    currentData.forecast = daily;
    return currentData;
  } catch (error) {
    // Re-throw error for upstream handling
    throw error;
  }
}

export default fetchWeather;
