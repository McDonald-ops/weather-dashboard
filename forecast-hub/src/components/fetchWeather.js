// fetchWeather.js
async function fetchWeather(city) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!API_KEY) throw new Error("Missing OpenWeather API key");

  const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  try {
    const [curRes, fRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl),
    ]);

    if (!curRes.ok) throw new Error("City not found");
    if (!fRes.ok) {
      // if forecast fails, still return current weather but with empty forecast
      const currentData = await curRes.json();
      currentData.forecast = [];
      return currentData;
    }

    const currentData = await curRes.json();
    const forecastData = await fRes.json();

    // process 3-hour forecast list into daily summaries (next 5 days)
    const list = forecastData.list || [];

    // helper to extract YYYY-MM-DD local date using the data's dt_txt (which is in UTC but OK for grouping)
    const groups = {};
    for (const item of list) {
      // item.dt_txt e.g. "2025-08-27 12:00:00"
      const date = item.dt_txt.split(" ")[0];
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
    }

    const todayStr = new Date(currentData.dt * 1000)
      .toISOString()
      .split("T")[0];

    // build an ordered array of next dates excluding today, take up to 5
    const dates = Object.keys(groups)
      .filter((d) => d !== todayStr)
      .sort()
      .slice(0, 5);

    const daily = dates.map((date) => {
      const items = groups[date];
      let minTemp = Number.POSITIVE_INFINITY;
      let maxTemp = Number.NEGATIVE_INFINITY;
      let humiditySum = 0;
      let count = 0;
      const weatherCount = {}; // count by description/icon

      for (const it of items) {
        const t = it.main?.temp;
        if (typeof t === "number") {
          if (t < minTemp) minTemp = t;
          if (t > maxTemp) maxTemp = t;
        }
        humiditySum += it.main?.humidity ?? 0;
        count += 1;

        const key = `${it.weather[0].main}|${it.weather[0].icon}|${it.weather[0].description}`;
        weatherCount[key] = (weatherCount[key] || 0) + 1;
      }

      // pick predominant weather entry
      const predominantKey = Object.keys(weatherCount).reduce((a, b) =>
        weatherCount[a] > weatherCount[b] ? a : b
      );
      const [predMain, predIcon, predDesc] = predominantKey.split("|");

      return {
        date, // YYYY-MM-DD
        minTemp: Number.isFinite(minTemp) ? Math.round(minTemp) : null,
        maxTemp: Number.isFinite(maxTemp) ? Math.round(maxTemp) : null,
        humidity: count ? Math.round(humiditySum / count) : null,
        main: predMain,
        icon: predIcon,
        description: predDesc,
      };
    });

    currentData.forecast = daily;
    return currentData;
  } catch (error) {
    throw error;
  }
}

export default fetchWeather;
