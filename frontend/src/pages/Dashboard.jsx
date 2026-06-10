import { useState } from "react";
import {
  getProfile,
  getTopArtists,
  getTopTracks,
  getRecentTracks,
  getTopGenres,
  getWeeklyTrends,
  getTimeAnalysis,
  getRecommendedArtists,
  getRecommendedTracks,
  getHourlyHeatmap,
} from "../services/api";

import WrappedStory from "../components/WrappedStory";
import ShareCard from "../components/ShareCard";
import GenreChart from "../components/GenreChart";
import PersonalityCard from "../components/PersonalityCard";
import HourlyHeatmap from "../components/HourlyHeatmap";
import WeeklyTrends from "../components/WeeklyTrends";
import TimeAnalysis from "../components/TimeAnalysis";
import StatsCards from "../components/StatsCards";
import TopArtistsChart from "../components/TopArtistsChart";
import TopTracksChart from "../components/TopTracksChart";
import Recommendations from "../components/Recommendations";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";
import ProgressLoader from "../components/ProgressLoader";
import WrappedSummary from "../components/WrappedSummary";

import "./Dashboard.css";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [hourlyHeatmap, setHourlyHeatmap] = useState([]);
  const [weeklyTrends, setWeeklyTrends] = useState([]);
  const [timeAnalysis, setTimeAnalysis] = useState(null);
const [recommendedArtists, setRecommendedArtists] = useState([]);
const [recommendedTracks, setRecommendedTracks] = useState([]);
const [error, setError] = useState("");
const [progress, setProgress] = useState(0);
const [loadingMessage, setLoadingMessage] = useState("");

  const fetchMusicData = async () => {
    if (!username.trim()) {
      setError("Please enter a Last.fm username.");
return;}

    try {
  setLoading(true);
  setError("");
  setProgress(5);
  setLoadingMessage("Starting music analysis...");

  setProgress(10);
  setLoadingMessage("Fetching profile...");
  const profileRes = await getProfile(username);

  setProgress(25);
  setLoadingMessage("Loading top artists...");
  const artistsRes = await getTopArtists(username);

  setProgress(40);
  setLoadingMessage("Loading top tracks...");
  const tracksRes = await getTopTracks(username);

  setProgress(50);
  setLoadingMessage("Fetching recent tracks...");
  const recentRes = await getRecentTracks(username);

  setProgress(60);
  setLoadingMessage("Building genre analysis...");
  const genresRes = await getTopGenres(username);

  setProgress(70);
  setLoadingMessage("Creating activity heatmap...");
  const hourlyHeatmapRes = await getHourlyHeatmap(username);

  setProgress(78);
  setLoadingMessage("Calculating last 7 days trend...");
  const weeklyRes = await getWeeklyTrends(username);

  setProgress(85);
  setLoadingMessage("Analyzing listening time...");
  const timeRes = await getTimeAnalysis(username);

  setProgress(92);
  setLoadingMessage("Generating recommendations...");
  const recommendedArtistsRes = await getRecommendedArtists(username);
  const recommendedTracksRes = await getRecommendedTracks(username);

  setProgress(100);
  setLoadingMessage("Finalizing wrapped...");

  setProfile(profileRes.data.user);
  setTopArtists(artistsRes.data.topartists.artist || []);
  setTopTracks(tracksRes.data.toptracks.track || []);
  setRecentTracks(recentRes.data.recenttracks.track || []);
  setGenres(genresRes.data.genres || []);
  setHourlyHeatmap(hourlyHeatmapRes.data.hourlyHeatmap || []);
  setWeeklyTrends(weeklyRes.data.weeklyTrends || []);
  setTimeAnalysis(timeRes.data || null);
  setRecommendedArtists(recommendedArtistsRes.data.recommendedArtists || []);
  setRecommendedTracks(recommendedTracksRes.data.recommendedTracks || []);
} catch (error) {
  console.error(error);
  setError("Could not fetch Last.fm data. Check username or backend server.");
} finally {
  setLoading(false);
}
  };

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Personal Music Analytics Platform</h1>
      <p className="dashboard-subtitle">
        Generate a music wrapped dashboard using Last.fm data.
      </p>

      <div className="search-container">
        <input
          className="username-input"
          type="text"
          placeholder="Enter Last.fm username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className="generate-btn" onClick={fetchMusicData}>
          Generate Wrapped
        </button>
      </div>

      {loading && (
  <ProgressLoader progress={progress} message={loadingMessage} />
)}

<ErrorMessage message={error} />

      {profile && (
        <>
          <h2 className="wrapped-title">{profile.name}'s Music Wrapped</h2>

          <StatsCards
            profile={profile}
            topArtists={topArtists}
            topTracks={topTracks}
          />
          
          <TopArtistsChart artists={topArtists} />
          <TopTracksChart tracks={topTracks} />
          {genres.length > 0 && <GenreChart genres={genres} />}
                

<PersonalityCard topArtists={topArtists} genres={genres} />

<WrappedSummary
  profile={profile}
  topArtists={topArtists}
  topTracks={topTracks}
  genres={genres}
/>
<WrappedStory
  profile={profile}
  topArtists={topArtists}
  topTracks={topTracks}
  genres={genres}
/>

<ShareCard
  profile={profile}
  topArtists={topArtists}
  topTracks={topTracks}
  genres={genres}
/>
<Recommendations
  artists={recommendedArtists}
  tracks={recommendedTracks}
/>
{hourlyHeatmap.length > 0 && <HourlyHeatmap data={hourlyHeatmap} />}
{weeklyTrends.length > 0 && <WeeklyTrends data={weeklyTrends} />}

{timeAnalysis && <TimeAnalysis data={timeAnalysis} />}


          <div className="recent-card">
            <h2>Recently Played</h2>

            <ul className="recent-list">
              {recentTracks.map((track, index) => (
                <li key={index} className="recent-item">
                  <span>{track.name}</span>
                  <strong>{track.artist["#text"]}</strong>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Dashboard;