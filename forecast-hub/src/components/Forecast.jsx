import { DateTime } from "luxon";

function Forecast({ forecast = [] }) {
  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-sm text-gray-300">
        5-day forecast not available
      </div>
    );
  }

  // Limit to 5 items just in case
  const days = forecast.slice(0, 5);

  return (
    <div className="w-full relative">
      {/* Left gradient */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/70 to-transparent z-10" />

      {/* Forecast scroll container */}
      <div className="flex gap-3 overflow-x-auto pb-2 
                      [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {days.map((day) => {
          const dt = DateTime.fromISO(day.date);
          const weekday = dt.toFormat("ccc"); // Mon, Tue...
          const dateShort = dt.toFormat("LLL dd"); // Aug 27

          const iconUrl = day.icon
            ? `https://openweathermap.org/img/wn/${day.icon}@2x.png`
            : null;

          return (
            <div
              key={day.date}
              className="flex-none min-w-[120px] p-3 rounded-lg bg-white/5 border border-white/10 text-center text-xs"
            >
              <div className="text-xs opacity-80">{weekday}</div>
              <div className="text-[11px] opacity-60">{dateShort}</div>

              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={day.description}
                  className="w-12 h-12 my-1 mx-auto"
                />
              ) : (
                <div className="w-12 h-12 my-1 mx-auto" />
              )}

              <div className="text-sm font-semibold leading-none">
                {day.maxTemp ?? "—"}°
              </div>
              <div className="text-[11px] opacity-75 leading-none">
                {day.minTemp ?? "—"}°
              </div>
              <div className="text-[10px] opacity-70 truncate mt-1">
                {day.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/70 to-transparent z-10" />
    </div>
  );
}

export default Forecast;
