async function fetchWeather(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(weatherUrl);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export default fetchWeather;
