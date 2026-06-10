import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./TopArtistsChart.css";

function TopArtistsChart({ artists }) {
  const data = artists.map((artist) => ({
    name: artist.name,
    plays: Number(artist.playcount),
  }));

  return (
    <div className="chart-card">
      <h2>Top Artists</h2>

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

export default TopArtistsChart;