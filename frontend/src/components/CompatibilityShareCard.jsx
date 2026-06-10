import { useRef } from "react";
import html2canvas from "html2canvas";
import "./CompatibilityShareCard.css";

function CompatibilityShareCard({ report }) {
  const cardRef = useRef(null);

  if (!report) return null;

  const topSharedArtist = report.sharedArtists?.[0]?.name || "No shared artist";

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: null,
      scale: 2,
    });

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");

    link.href = image;
    link.download = "compatibility-card.png";
    link.click();
  };

  return (
    <div className="compat-share-section">
      <h2>Compatibility Share Card</h2>

      <div className="compat-share-card" ref={cardRef}>
        <p className="compat-share-label">Music Compatibility</p>

        <h1>
          {report.user1} × {report.user2}
        </h1>

        <div className="compat-score-large">
          {report.compatibilityScore}%
        </div>

        <p className="compat-subtitle">Compatible</p>

        <div className="compat-share-details">
          <div>
            <span>Top Shared Artist</span>
            <strong>{topSharedArtist}</strong>
          </div>

          <div>
            <span>Personality Match</span>
            <strong>{report.personalityMatch}%</strong>
          </div>

          <div>
            <span>{report.user1}</span>
            <strong>{report.user1Personality}</strong>
          </div>

          <div>
            <span>{report.user2}</span>
            <strong>{report.user2Personality}</strong>
          </div>
        </div>
      </div>

      <button className="compat-download-btn" onClick={downloadCard}>
        Download Compatibility Card
      </button>
    </div>
  );
}

export default CompatibilityShareCard;