import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WrappedStory.css";

function WrappedStory({ profile, topArtists, topTracks, genres }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const topArtist = topArtists?.[0];
  const topTrack = topTracks?.[0];
  const topGenre = genres?.[0];

  const slides = [
    {
      title: "2026 Wrapped",
      text: `Welcome back, ${profile?.name || "listener"}.`,
    },
    {
      title: "Total Plays",
      text: `You listened to ${profile?.playcount || 0} tracks.`,
    },
    {
      title: "Top Artist",
      text: `${topArtist?.name || "N/A"} ruled your playlist with ${
        topArtist?.playcount || 0
      } plays.`,
    },
    {
      title: "Top Track",
      text: `${topTrack?.name || "N/A"} was your favorite track.`,
    },
    {
      title: "Favorite Genre",
      text: `${topGenre?.name || "N/A"} defined your music taste.`,
    },
    {
      title: "Music Personality",
      text: getPersonality(topArtists, genres),
    },
    {
      title: "Roast Me",
      text: `You listened to ${topArtist?.name || "your top artist"} ${
        topArtist?.playcount || 0
      } times. We get it.`,
    },
    {
      title: "Thanks for Listening",
      text: "See you in 2027.",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === slides.length - 1) {
          setIsPlaying(false);
          return prev;
        }

        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const playStory = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    }

    setIsPlaying(true);
  };

  const pauseStory = () => {
    setIsPlaying(false);
  };

  const replayStory = () => {
    setCurrentSlide(0);
    setIsPlaying(true);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
    setCurrentSlide(0);
    setIsPlaying(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsPlaying(false);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const storyContent = (
    <div className={isFullscreen ? "story-card fullscreen-card" : "story-card"}>
      <div className="story-progress">
        <div
          className="story-progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="story-slide"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -30 }}
          transition={{ duration: 0.45 }}
        >
          <span className="slide-count">
            {currentSlide + 1} / {slides.length}
          </span>

          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].text}</p>
        </motion.div>
      </AnimatePresence>

      <div className="story-controls">
        <button onClick={prevSlide} disabled={currentSlide === 0}>
          Previous
        </button>

        {!isPlaying ? (
          <button onClick={playStory}>Play</button>
        ) : (
          <button onClick={pauseStory}>Pause</button>
        )}

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          Next
        </button>

        <button onClick={replayStory}>Replay</button>
      </div>
    </div>
  );

  return (
    <div className="story-section">
      <div className="story-header">
        <div>
          <h2>Wrapped Replay Mode</h2>
          <p>Play your music story like a mini Spotify Wrapped.</p>
        </div>

        <button className="fullscreen-btn" onClick={openFullscreen}>
          Open Fullscreen Replay
        </button>
      </div>

      {storyContent}

      {isFullscreen && (
        <div className="fullscreen-overlay">
          <button className="close-fullscreen-btn" onClick={closeFullscreen}>
            ×
          </button>

          {storyContent}
        </div>
      )}
    </div>
  );
}

function getPersonality(topArtists, genres) {
  const topArtist = topArtists?.[0];
  const genreCount = genres?.length || 0;

  if (!topArtist) return "Unknown Listener";

  const topArtistPlays = Number(topArtist.playcount);

  if (topArtistPlays >= 50) return "You are a Loyal Fan.";
  if (genreCount >= 8) return "You are a Genre Explorer.";
  if (genreCount >= 5) return "You are a Balanced Listener.";

  return "You are a Casual Listener.";
}

export default WrappedStory;