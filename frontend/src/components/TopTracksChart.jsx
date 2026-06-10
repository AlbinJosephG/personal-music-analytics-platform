import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./TopTracksChart.css";

function TopTracksChart({ tracks }) {
  const data = tracks.map((track) => ({
    name:
      track.name.length > 18
        ? track.name.substring(0, 18) + "..."
        : track.name,
    plays: Number(track.playcount),
  }));

  return (
    <div className="chart-card">
      <h2>Top Tracks</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="plays" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopTracksChart;