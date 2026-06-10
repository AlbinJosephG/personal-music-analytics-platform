import "./HourlyHeatmap.css";

function HourlyHeatmap({ data }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const hours = Array.from({ length: 24 }, (_, index) => index);

  const maxPlays = Math.max(...data.map((item) => item.plays), 1);

  const getPlays = (day, hour) => {
    const item = data.find((entry) => entry.day === day && entry.hour === hour);
    return item ? item.plays : 0;
  };

  const getIntensityClass = (plays) => {
    if (plays === 0) return "level-0";

    const ratio = plays / maxPlays;

    if (ratio <= 0.25) return "level-1";
    if (ratio <= 0.5) return "level-2";
    if (ratio <= 0.75) return "level-3";

    return "level-4";
  };

  return (
    <div className="hourly-heatmap-card">
      <h2>Hourly Listening Heatmap</h2>
      <p>Shows which days and hours you listen the most.</p>

      <div className="hour-label-row">
        <span></span>
        {hours.map((hour) => (
          <span key={hour} className="hour-label">
            {hour}
          </span>
        ))}
      </div>

      <div className="heatmap-table">
        {days.map((day) => (
          <div className="heatmap-day-row" key={day}>
            <span className="day-label">{day.slice(0, 3)}</span>

            {hours.map((hour) => {
              const plays = getPlays(day, hour);

              return (
                <div
                  key={`${day}-${hour}`}
                  className={`heatmap-cell ${getIntensityClass(plays)}`}
                  title={`${day}, ${hour}:00 - ${plays} plays`}
                >
                  {plays > 0 ? plays : ""}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-cell level-0"></div>
        <div className="legend-cell level-1"></div>
        <div className="legend-cell level-2"></div>
        <div className="legend-cell level-3"></div>
        <div className="legend-cell level-4"></div>
        <span>More</span>
      </div>
    </div>
  );
}

export default HourlyHeatmap;