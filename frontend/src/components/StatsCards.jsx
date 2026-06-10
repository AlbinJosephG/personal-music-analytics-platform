import "./StatsCards.css";

function StatsCards({ profile, topArtists, topTracks }) {
  const topArtist = topArtists?.[0];
  const topTrack = topTracks?.[0];

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Plays</h3>
        <h2>{profile?.playcount || 0}</h2>
      </div>

      <div className="stat-card">
        <h3>Top Artist</h3>
        <h2>{topArtist?.name || "N/A"}</h2>
      </div>

      <div className="stat-card">
        <h3>Top Song</h3>
        <h2>{topTrack?.name || "N/A"}</h2>
      </div>

      <div className="stat-card">
        <h3>Artists Analyzed</h3>
        <h2>{topArtists?.length || 0}</h2>
      </div>
    </div>
  );
}

export default StatsCards;