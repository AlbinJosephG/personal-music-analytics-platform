import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./TimeAnalysis.css";

function TimeAnalysis({ data }) {
  return (
    <div className="time-card">
      <h2>Listening Time Analysis</h2>

      <div className="time-badge">
        Most active time: {data.favoriteTime}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.buckets}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="plays" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimeAnalysis;