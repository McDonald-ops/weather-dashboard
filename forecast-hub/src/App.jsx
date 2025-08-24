import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import fetchWeather from "./components/fetchWeather";

export default function App() {
  const [weather, setWeather] = useState(null);

  // Load a default city when app starts
  useEffect(() => {
    fetchWeather("Lagos")
      .then(setWeather)
      .catch((err) => console.error(err));
  }, []);

  // Search handler
  const getWeather = async (city) => {
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (error) {
      alert(error.message);
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
      <WeatherCard data={weather} onSearch={getWeather} />
    </div>
  );
}
