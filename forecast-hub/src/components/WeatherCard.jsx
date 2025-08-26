import { useEffect, useMemo } from "react";
import { DateTime } from "luxon";
import tzlookup from "tz-lookup";
import SearchBar from "./SearchBar";

// Utility to format date & time using tz-lookup
function formatDateTime(dt, lat, lon) {
  try {
    const zoneName = tzlookup(lat, lon); // e.g. "Africa/Lagos"
    const localTime = DateTime.fromSeconds(dt, { zone: zoneName });
    return { localTime, zoneName };
  } catch (err) {
    const localTime = DateTime.fromSeconds(dt, { zone: "utc" });
    return { localTime, zoneName: "UTC" };
  }
}

function selectBackground({ weatherArray, iconCode, hasSearched }) {
  const defaultBg = "/bg.jpeg"; // default background
  if (!hasSearched || !weatherArray || weatherArray.length === 0) return defaultBg;

  const main = (weatherArray[0]?.main || "").toLowerCase();
  const isNight = iconCode?.endsWith?.("n");

  if (main === "clear") {
    return isNight ? "/clearnight.jpg" : "/sunny.jpg";
  }
  if (main === "clouds") return "/cloud.jpg";
  if (main === "rain" || main === "drizzle") return "/rain.jpg";
  if (main === "snow") return "/snow.jpg";
  if (main === "thunderstorm") return "/storm.jpg";

  return defaultBg;
}

function WeatherCard({ data, onSearch, hasSearched }) {
  // default placeholders
  let name = "";
  let sys = { country: "" };
  let main = { temp: 0, humidity: 0 };
  let wind = { speed: 0 };
  let weather = [{ description: "", icon: "01d" }];
  let localTime = DateTime.now();
  let zoneName = "UTC";

  if (data) {
    const { dt, coord } = data;
    ({ name, sys, main, wind, weather } = data);
    ({ localTime, zoneName } = formatDateTime(dt, coord?.lat, coord?.lon));
  }

  const iconCode = weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // choose background based on weather condition
  const leftBg = useMemo(
    () => selectBackground({ weatherArray: weather, iconCode, hasSearched }),
    [weather, iconCode, hasSearched]
  );

  // preload backgrounds
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
    <div className="flex w-[700px] h-[400px] rounded-2xl shadow-2xl overflow-hidden">
      {/* Left side */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-between p-6 text-white transition-all duration-700 ease-out relative"
        style={{
          backgroundImage: `url(${leftBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

        <div className="flex justify-start relative z-10">
          <img
            src={weatherIcon}
            alt="Weather Icon"
            className="w-28 h-28 drop-shadow-lg"
          />
        </div>

        <div className="flex flex-col relative z-10">
          <p className="text-sm font-light">
            {localTime.toFormat("yyyy-LL-dd HH:mm")}
          </p>
          <p className="text-sm opacity-80">{zoneName}</p>

          <h2 className="text-2xl font-semibold mt-2">
            {name}, {sys?.country}
          </h2>

          <p className="text-6xl font-extrabold mt-2">
            {typeof main?.temp === "number" ? Math.round(main.temp) : main?.temp}°C
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 bg-black/90 text-white flex flex-col justify-between p-6">
        <div className="space-y-4">
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

        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}

export default WeatherCard;
