import "./ListeningHeatmap.css";

function ListeningHeatmap({ data }) {
  const maxPlays = Math.max(...data.map((item) => item.plays), 1);

  return (
    <div className="heatmap-card">
      <h2>Listening Heatmap</h2>
      <p>Your listening activity by day.</p>

      <div className="heatmap-grid">
        {data.map((item) => {
          const intensity = item.plays / maxPlays;

          return (
            <div className="heatmap-row" key={item.day}>
              <span className="heatmap-day">{item.day}</span>

              <div className="heatmap-bar-bg">
                <div
                  className="heatmap-bar"
                  style={{ width: `${intensity * 100}%` }}
                ></div>
              </div>

              <span className="heatmap-count">{item.plays}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListeningHeatmap;