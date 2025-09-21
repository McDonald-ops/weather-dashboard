import { DateTime } from "luxon";

/**
 * Forecast component displaying 5-day weather forecast
 * 
 * Renders a horizontal scrolling list of daily weather forecasts with:
 * - Day of week and date
 * - Weather condition icons
 * - High and low temperatures
 * - Weather descriptions
 * 
 * Features:
 * - Responsive design with different sizes for mobile/desktop
 * - Horizontal scrolling with hidden scrollbars
 * - Gradient overlays for visual polish
 * - Graceful handling of missing forecast data
 * 
 * @param {Object} props - Component props
 * @param {Array} props.forecast - Array of daily forecast objects
 * @returns {JSX.Element} Forecast display component
 */
function Forecast({ forecast = [] }) {
  // Handle case when no forecast data is available
  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-sm text-gray-300">
        5-day forecast not available
      </div>
    );
  }

  // Ensure we only display up to 5 days
  const days = forecast.slice(0, 5);

  return (
    <div className="w-full relative">
      {/* Left gradient overlay for visual polish */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/70 to-transparent z-10" />

      {/* Horizontal scrolling forecast container */}
      <div className="flex gap-3 overflow-x-auto pb-2 
                      [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {days.map((day) => {
          // Format date information using Luxon
          const dt = DateTime.fromISO(day.date);
          const weekday = dt.toFormat("ccc"); // Mon, Tue, Wed...
          const dateShort = dt.toFormat("LLL dd"); // Aug 27, Sep 01...

          // Construct weather icon URL if available
          const iconUrl = day.icon
            ? `https://openweathermap.org/img/wn/${day.icon}@2x.png`
            : null;

          return (
            <div
              key={day.date}
              className="flex-none min-w-[100px] sm:min-w-[120px] md:min-w-[140px] p-2 md:p-3 rounded-lg bg-white/5 border border-white/10 text-center text-xs"
            >
              {/* Day of week */}
              <div className="text-xs opacity-80">{weekday}</div>
              {/* Date */}
              <div className="text-[11px] opacity-60">{dateShort}</div>

              {/* Weather icon or placeholder */}
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={day.description}
                  className="w-10 h-10 md:w-12 md:h-12 my-1 mx-auto"
                />
              ) : (
                <div className="w-12 h-12 my-1 mx-auto" />
              )}

              {/* High temperature */}
              <div className="text-sm font-semibold leading-none">
                {day.maxTemp ?? "—"}°
              </div>
              {/* Low temperature */}
              <div className="text-[11px] opacity-75 leading-none">
                {day.minTemp ?? "—"}°
              </div>
              {/* Weather description */}
              <div className="text-[10px] opacity-70 truncate mt-1">
                {day.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right gradient overlay for visual polish */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/70 to-transparent z-10" />
    </div>
  );
}

export default Forecast;
