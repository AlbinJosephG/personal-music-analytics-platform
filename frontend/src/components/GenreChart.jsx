import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import "./GenreChart.css";

const COLORS = [
  "#1db954",
  "#191414",
  "#ff6b6b",
  "#4dabf7",
  "#ffd43b",
  "#845ef7",
  "#20c997",
  "#f06595",
  "#ffa94d",
  "#748ffc",
];

function GenreChart({ genres }) {
  return (
    <div className="genre-card">
      <h2>Genre Analysis</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={genres}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {genres.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenreChart;