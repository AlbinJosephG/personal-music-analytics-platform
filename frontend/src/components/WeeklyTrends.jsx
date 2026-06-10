import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./WeeklyTrends.css";

function WeeklyTrends({ data }) {
  return (
    <div className="weekly-card">
      <h2>Last 7 Days Listening Trend</h2>
      <p>Your daily listening activity from the past week.</p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="plays" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WeeklyTrends;