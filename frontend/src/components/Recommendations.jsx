import "./Recommendations.css";

function Recommendations({ artists, tracks }) {
  return (
    <div className="recommendation-section">
      <h2>Recommended For You</h2>
      <p>Based on your top artists and tracks.</p>

      <div className="recommendation-grid">
        <div className="recommendation-card">
          <h3>Similar Artists</h3>

          {artists.length === 0 ? (
            <p>No artist recommendations found.</p>
          ) : (
            <ul>
              {artists.map((artist, index) => (
                <li key={index}>
                  <div>
                    <strong>{artist.name}</strong>
                    <span>Based on {artist.basedOn}</span>
                  </div>

                  <small>{artist.match}% match</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="recommendation-card">
          <h3>Similar Tracks</h3>

          {tracks.length === 0 ? (
            <p>No track recommendations found.</p>
          ) : (
            <ul>
              {tracks.map((track, index) => (
                <li key={index}>
                  <div>
                    <strong>{track.name}</strong>
                    <span>
                      {track.artist} • Based on {track.basedOn}
                    </span>
                  </div>

                  <small>{track.match}% match</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recommendations;