import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import fetchWeather from "./components/fetchWeather";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getWeather("Lagos");
  }, []);

  const getWeather = async (city) => {
    setError("");
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-center bg-no-repeat p-6"
      style={{
        backgroundImage: "url('/cover.jpg')",
        backgroundSize: "cover",
      }}
    >
      {error && (
        <ErrorMessage message={error} onClose={() => setError("")} />
      )}
      <WeatherCard data={weather} onSearch={getWeather} />
    </div>
  );
}

export default App;
