import "./WrappedSummary.css";

function WrappedSummary({ profile, topArtists, topTracks, genres }) {
  const topArtist = topArtists?.[0];
  const topTrack = topTracks?.[0];
  const topGenre = genres?.[0];

  return (
    <div className="wrapped-summary">
      <h2>2026 Music Wrapped</h2>

      <div className="summary-grid">
        <div>
          <span>Total Plays</span>
          <strong>{profile?.playcount || 0}</strong>
        </div>

        <div>
          <span>Top Artist</span>
          <strong>{topArtist?.name || "N/A"}</strong>
        </div>

        <div>
          <span>Top Track</span>
          <strong>{topTrack?.name || "N/A"}</strong>
        </div>

        <div>
          <span>Top Genre</span>
          <strong>{topGenre?.name || "N/A"}</strong>
        </div>
      </div>
    </div>
  );
}

export default WrappedSummary;