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

function WeatherCard({ data, onSearch }) {
  if (!data) return null;

  const { name, sys, main, wind, weather, dt, coord } = data;
  const bgImage = "/bg.jpeg";

  const iconCode = weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  const { localTime, zoneName } = formatDateTime(dt, coord?.lat, coord?.lon);

  return (
    <div className="flex w-[700px] h-[400px] rounded-2xl shadow-2xl overflow-hidden">
      {/* Left side */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-between p-6 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Weather icon */}
        <div className="flex justify-start">
          <img
            src={weatherIcon}
            alt="Weather Icon"
            className="w-28 h-28 drop-shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-sm font-light">
            {localTime.toFormat("yyyy-LL-dd HH:mm")}
          </p>
          <p className="text-sm opacity-80">{zoneName}</p>

          <h2 className="text-2xl font-semibold mt-2">
            {name}, {sys?.country}
          </h2>

          <p className="text-6xl font-extrabold mt-2">
            {Math.round(main?.temp)}°C
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
            <span className="font-light">{data.clouds?.all}%</span>
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

        {/* Search Bar */}
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}

export default WeatherCard;
