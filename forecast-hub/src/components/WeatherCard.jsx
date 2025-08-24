import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import tzlookup from "tz-lookup";

// Utility to format date & time using tz-lookup
function formatDateTime(dt, lat, lon) {
  try {
    const zoneName = tzlookup(lat, lon); // e.g. "Africa/Lagos"
    const localTime = DateTime.fromSeconds(dt, { zone: zoneName });
    return { localTime, zoneName };
  } catch (err) {
    // fallback if tzlookup fails
    const localTime = DateTime.fromSeconds(dt, { zone: "utc" });
    return { localTime, zoneName: "UTC" };
  }
}

function WeatherCard({ data, onSearch }) {
  if (!data) return null;

  const { name, sys, main, wind, weather, dt, coord } = data;
  const bgImage = "/bg.jpeg";

  // Weather icon from OpenWeatherMap
  const iconCode = weather[0]?.icon;
  const weatherIcon = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  // Format date & time with actual IANA timezone
  const { localTime, zoneName } = formatDateTime(dt, coord?.lat, coord?.lon);

  return (
    <div className="flex w-[700px] h-[400px] rounded-2xl shadow-2xl overflow-hidden">
      {/* Left: City info with image background */}
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-between p-6 text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Weather icon at top */}
        <div className="flex justify-start">
          <img
            src={weatherIcon}
            alt="Weather Icon"
            className="w-28 h-28 drop-shadow-lg"
          />
        </div>

        {/* Middle section with date, timezone, city, and temperature */}
        <div className="flex flex-col">
          {/* Current Date & Time */}
          <p className="text-sm font-light">
            {localTime.toFormat("yyyy-LL-dd HH:mm")}
          </p>

          {/* Timezone (real IANA name) */}
          <p className="text-sm opacity-80">{zoneName}</p>

          {/* City & Country */}
          <h2 className="text-2xl font-semibold mt-2">
            {name}, {sys?.country}
          </h2>

          {/* Temperature */}
          <p className="text-6xl font-extrabold mt-2">
            {Math.round(main?.temp)}°C
          </p>
        </div>
      </div>

      {/* Right: Weather details + Search */}
      <div className="w-1/2 bg-black/90 text-white flex flex-col justify-between p-6">
        {/* Weather details */}
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
      <form
        onSubmit={(e) => {
        e.preventDefault();
       const city = e.target.city.value.trim();
        if (city) onSearch(city);
     }}
        className="flex flex-col gap-4 mt-6"
    >
      <input
        name="city"
        type="text"
        placeholder="Search city here"
        className="p-4 text-lg rounded-xl bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
     />
       <button className="bg-teal-600 py-4 text-lg rounded-xl text-white font-bold hover:bg-teal-700 transition">
        GET WEATHER
      </button>
    </form>

      </div>
    </div>
  );
}

export default WeatherCard;
