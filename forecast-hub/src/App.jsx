import { useEffect, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import fetchWeather from "./components/fetchWeather";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // remains false until user searches

  // On mount fetch Lagos by default (not considered a user search)
  useEffect(() => {
    getWeather("Lagos", false);
  }, []);

  const getWeather = async (city, isUserSearch = false) => {
    setError("");
    try {
      const data = await fetchWeather(city);
      setWeather(data);
      if (isUserSearch) setHasSearched(true);
    } catch (err) {
      if (!isUserSearch && city.toLowerCase() === "lagos") {
        setWeather({
          dt: Math.floor(Date.now() / 1000),
          coord: { lat: 6.5244, lon: 3.3792 }, // Lagos coordinates
          name: "Lagos",
          sys: { country: "NG" },
          main: { temp: 0, humidity: 0 },
          wind: { speed: 0 },
          weather: [{ description: "—", icon: "01d" }],
          clouds: { all: 0 },
          forecast: [], // empty forecast fallback
        });
      } else {
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
      {error && <ErrorMessage message={error} onClose={() => setError("")} />}
      <WeatherCard
        data={weather}
        onSearch={(city) => getWeather(city, true)}
        hasSearched={hasSearched}
      />
    </div>
  );
}

export default App;
