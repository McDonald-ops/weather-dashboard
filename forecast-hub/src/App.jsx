import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import fetchWeather from "./components/fetchWeather";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Default city
  useEffect(() => {
    getWeather("Lagos");
  }, []);

  const getWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = () => {
    if (weather?.name) {
      getWeather(weather.name);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: "cover",
      }}
    >
      {loading && <Loader />}
      {!loading && (
        <WeatherCard
          data={weather}
          onSearch={getWeather}
          onRefresh={refreshWeather}
        />
      )}
      <ErrorMessage message={error} onClose={() => setError("")} />
    </div>
  );
}

export default App;
