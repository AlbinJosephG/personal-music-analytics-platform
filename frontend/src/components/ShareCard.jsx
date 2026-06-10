import { useRef } from "react";
import html2canvas from "html2canvas";
import "./ShareCard.css";

function ShareCard({ profile, topArtists, topTracks, genres }) {
  const cardRef = useRef(null);

  const topArtist = topArtists?.[0];
  const topTrack = topTracks?.[0];
  const topGenre = genres?.[0];

  const personality = getPersonality(topArtists, genres);

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = image;
    link.download = "music-wrapped-card.png";
    link.click();
  };

  return (
    <div className="share-section">
      <h2>Shareable Wrapped Card</h2>

      <div className="share-card" ref={cardRef}>
        <p className="share-label">My Music Wrapped 2026</p>

        <h1>{profile?.name || "Listener"}</h1>

        <div className="share-details">
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

          <div>
            <span>Personality</span>
            <strong>{personality}</strong>
          </div>
        </div>
      </div>

      <button className="download-btn" onClick={downloadCard}>
        Download Share Card
      </button>
    </div>
  );
}

function getPersonality(topArtists, genres) {
  const topArtist = topArtists?.[0];
  const genreCount = genres?.length || 0;

  if (!topArtist) return "Unknown";

  const topArtistPlays = Number(topArtist.playcount);

  if (topArtistPlays >= 50) return "Loyal Fan";
  if (genreCount >= 8) return "Genre Explorer";
  if (genreCount >= 5) return "Balanced Listener";

  return "Casual Listener";
}

export default ShareCard;