import "./PersonalityCard.css";

function getPersonality(topArtists, genres) {
  const topArtist = topArtists?.[0];
  const genreCount = genres?.length || 0;

  if (!topArtist) return "Unknown Listener";

  const topArtistPlays = Number(topArtist.playcount);

  if (topArtistPlays >= 50) {
    return "Loyal Fan";
  }

  if (genreCount >= 8) {
    return "Genre Explorer";
  }

  if (genreCount >= 5) {
    return "Balanced Listener";
  }

  return "Casual Listener";
}

function PersonalityCard({ topArtists, genres }) {
  const personality = getPersonality(topArtists, genres);

  return (
    <div className="personality-card">
      <h2>Your Music Personality</h2>

      <div className="personality-badge">
        {personality}
      </div>

      <p>
        Based on your top artists, genre variety, and listening patterns.
      </p>
    </div>
  );
}

export default PersonalityCard;