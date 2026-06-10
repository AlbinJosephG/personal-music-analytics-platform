# 🎵 Personal Music Analytics Platform

### Spotify Wrapped Inspired Music Intelligence Dashboard Powered by Last.fm

A Spotify Wrapped inspired music intelligence platform that transforms Last.fm listening history into interactive dashboards, compatibility reports, recommendation engines, replay stories, and advanced music analytics.

---

## ✨ Features

### 🎧 Music Wrapped Dashboard
- Top Artists
- Top Tracks
- Genre Analysis
- Music Personality Detection
- Weekly Listening Trends
- Recent Listening Activity

### 📊 Advanced Analytics
- Hourly Listening Heatmap
- Weekly Listening Trends
- Time of Day Analysis
- Listening Behavior Insights

### 🎬 Wrapped Replay Mode
- Fullscreen Wrapped Experience
- Auto Progress Slides
- Replay Button
- Spotify-Style Storytelling

### 🤝 Music Compatibility Engine
- Compatibility Score
- Shared Artists
- Shared Tracks
- Genre Battle
- Personality Match
- Unique Artists Comparison

### 🎯 Recommendation Engine
- Similar Artist Recommendations
- Similar Track Recommendations
- Match Percentage Scoring
- Duplicate Filtering

### 📤 Share Cards
- Wrapped Share Card
- Compatibility Share Card
- PNG Export using html2canvas

---
# 🏗️ Architecture

<br/>

```text
╔════════════════════════════════════════════════════════════╗
║                       USER LAYER                          ║
║               Browser / Desktop / Mobile                  ║
╚═══════════════════════╤════════════════════════════════════╝
                        │
                        ▼
╔════════════════════════════════════════════════════════════╗
║                    REACT FRONTEND                         ║
║       Dashboard • Replay • Compatibility • Share         ║
╚══════╤══════════════╤══════════════╤═══════════════════════╝
       │              │              │
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Wrapped     │ │ Analytics   │ │ Compatibility│
│ Replay      │ │ Dashboard   │ │ Engine      │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       └───────────────┼───────────────┘
                       │
                       ▼
╔════════════════════════════════════════════════════════════╗
║                     FLASK BACKEND                         ║
║          API Layer • Data Processing • Analytics          ║
╚══════╤══════════════╤══════════════╤═══════════════════════╝
       │              │              │
       ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Music       │ │ Similarity  │ │ Recommendation│
│ Analytics   │ │ Engine      │ │ Engine      │
└──────┬──────┘ └──────┬──────┘ └──────┬──────┘
       │               │               │
       └───────────────┼───────────────┘
                       │
                       ▼
╔════════════════════════════════════════════════════════════╗
║                      LAST.FM API                          ║
║     User Data • Artists • Tracks • Scrobbles • Tags       ║
╚════════════════════════════════════════════════════════════╝
```

<br/>
---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- Last.fm API Key

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---
##  Environment Variables

Create a `.env` file inside the backend folder:

```env
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
```

### Example

```env
LASTFM_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
```

### Important

Do not commit your `.env` file to GitHub.

Add this to `.gitignore`:

```text
.env
```

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Recharts
- Framer Motion
- html2canvas
- Axios

### Backend
- Flask
- Python
- Requests

### APIs
- Last.fm API

---

## 📂 Project Structure

```text
music-wrapped-project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── app.py
│   ├── services/
│   ├── .env
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## 📸 Output Screenshots
