import { useState } from "react";
import { compareUsers } from "../services/api";
import "./Compatibility.css";
import CompatibilityShareCard from "../components/CompatibilityShareCard";
import ProgressLoader from "../components/ProgressLoader";

function Compatibility() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  const handleCompare = async () => {
    if (!user1.trim() || !user2.trim()) {
      setError("Please enter both Last.fm usernames.");
      return;
    }

    let progressInterval;

    try {
      setLoading(true);
      setError("");
      setReport(null);
      setProgress(10);
      setLoadingMessage("Preparing comparison...");

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 35) {
            setLoadingMessage("Fetching both users' music data...");
            return prev + 5;
          }

          if (prev < 60) {
            setLoadingMessage("Comparing shared artists and tracks...");
            return prev + 3;
          }

          if (prev < 85) {
            setLoadingMessage("Building genre battle and personality match...");
            return prev + 2;
          }

          return prev;
        });
      }, 500);

      const res = await compareUsers(user1, user2);

      clearInterval(progressInterval);

      setProgress(100);
      setLoadingMessage("Finalizing compatibility report...");
      setReport(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not compare users. Check usernames or backend server.");
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  return (
    <div className="compatibility-page">
      <h1>Music Compatibility</h1>
      <p>Compare two Last.fm users and discover their music taste match.</p>

      <div className="compatibility-card">
        <input
          type="text"
          placeholder="First username"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
        />

        <input
          type="text"
          placeholder="Second username"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        />

        <button onClick={handleCompare}>Compare</button>
      </div>

      {loading && (
        <ProgressLoader progress={progress} message={loadingMessage} />
      )}

      {error && <div className="compat-error">{error}</div>}

      {report && (
        <div className="compat-report">
          <div className="score-card">
            <span>Compatibility Score</span>
            <h2>{report.compatibilityScore}%</h2>
            <p>
              {report.user1} × {report.user2}
            </p>
          </div>

          <div className="personality-match-card">
            <h2>Personality Match</h2>

            <div className="personality-grid">
              <div>
                <span>{report.user1}</span>
                <strong>{report.user1Personality}</strong>
              </div>

              <div>
                <span>{report.user2}</span>
                <strong>{report.user2Personality}</strong>
              </div>

              <div>
                <span>Match</span>
                <strong>{report.personalityMatch}%</strong>
              </div>
            </div>
          </div>

          <CompatibilityShareCard report={report} />

          <section className="compat-section">
            <h2>Shared Artists</h2>

            {report.sharedArtists.length === 0 ? (
              <p>No shared artists found.</p>
            ) : (
              <div className="shared-list">
                {report.sharedArtists.map((artist, index) => (
                  <div className="shared-item" key={index}>
                    <h3>{artist.name}</h3>

                    <div className="bar-row">
                      <span>{report.user1}</span>
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${Math.min(artist.user1Plays, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <strong>{artist.user1Plays}</strong>
                    </div>

                    <div className="bar-row">
                      <span>{report.user2}</span>
                      <div className="bar-bg">
                        <div
                          className="bar-fill second"
                          style={{
                            width: `${Math.min(artist.user2Plays, 100)}%`,
                          }}
                        ></div>
                      </div>
                      <strong>{artist.user2Plays}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="compat-section">
            <h2>Genre Battle</h2>

            <div className="genre-battle-grid">
              {report.genreBattle.map((genre, index) => (
                <div className="genre-battle-card" key={index}>
                  <h3>{genre.genre}</h3>

                  <div className="genre-scores">
                    <span>
                      {report.user1}: <strong>{genre.user1Score}</strong>
                    </span>
                    <span>
                      {report.user2}: <strong>{genre.user2Score}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="compat-section">
            <h2>Shared Tracks</h2>

            {report.sharedTracks.length === 0 ? (
              <p>No shared tracks found. Your exact track names may differ.</p>
            ) : (
              <ul className="simple-list">
                {report.sharedTracks.map((track, index) => (
                  <li key={index}>
                    <strong>{track.name}</strong>
                    <span>
                      {report.user1}: {track.user1Plays} | {report.user2}:{" "}
                      {track.user2Plays}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="compat-section unique-grid">
            <div>
              <h2>Only {report.user1} listens to</h2>
              <ul className="simple-list">
                {report.uniqueUser1.map((artist, index) => (
                  <li key={index}>{artist}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Only {report.user2} listens to</h2>
              <ul className="simple-list">
                {report.uniqueUser2.map((artist, index) => (
                  <li key={index}>{artist}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Compatibility;