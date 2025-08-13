// Function to call weather API
export async function fetchWeatherData(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${d30192f122aa8910209d2c157559b4da}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${d30192f122aa8910209d2c157559b4da}&units=metric`;

  try {
    // Run both API calls at the same time
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

    // Handle errors if any request fails
    if (!weatherResponse.ok || !forecastResponse.ok) {
      throw new Error("City not found");
    }

    // Convert responses to JSON
    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Return them as one object
    return {
      weather: weatherData,
      forecast: forecastData
    };
  } catch (error) {
    throw error;
  }
}
