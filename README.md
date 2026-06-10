<div align="center">

# 🎵 Personal Music Analytics Platform

### Spotify Wrapped Inspired Music Intelligence Dashboard Powered by Last.fm

<br/>

[![License](https://img.shields.io/badge/License-MIT-0d1117?style=for-the-badge&labelColor=f97316&color=0d1117)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-0d1117?style=for-the-badge&labelColor=22c55e&color=0d1117)](#)
[![React](https://img.shields.io/badge/React-Frontend-0d1117?style=for-the-badge&logo=react&logoColor=white&labelColor=61DAFB&color=0d1117)](https://react.dev)
[![Flask](https://img.shields.io/badge/Flask-Backend-0d1117?style=for-the-badge&logo=flask&logoColor=white&labelColor=000000&color=0d1117)](https://flask.palletsprojects.com)
[![Last.fm](https://img.shields.io/badge/Last.fm-API-0d1117?style=for-the-badge&logo=lastdotfm&logoColor=white&labelColor=D51007&color=0d1117)](https://www.last.fm/api)

<br/>

> *A Spotify Wrapped inspired music intelligence platform that transforms Last.fm listening history into interactive dashboards, replay stories, recommendation engines, compatibility reports, and advanced listening analytics.*

<br/>

[**✦ Features**](#-features) ·
[**✦ Architecture**](#️-architecture) ·
[**✦ Quick Start**](#-quick-start) ·
[**✦ API Reference**](#-api-reference) ·
[**✦ Tech Stack**](#️-tech-stack)

</div>

---

## ✨ Features

<br/>

### 🎧 Music Analytics Engine

| Capability               | Description                                   |
| ------------------------ | --------------------------------------------- |
| Top Artists Analysis     | Identifies the user's most played artists     |
| Top Tracks Analysis      | Finds the user's most played songs            |
| Genre Analysis           | Builds a genre profile from listening history |
| Listening Statistics     | Calculates total plays and engagement         |
| Recent Activity Tracking | Retrieves recently played tracks              |

<br/>

### 📊 Interactive Analytics Dashboard

➤ Interactive data visualizations

➤ Weekly listening trends

➤ Hourly listening heatmap

➤ Time-of-day analysis

➤ Listening behavior insights

<br/>

### 🎬 Wrapped Replay Experience

| Capability        | Description                             |
| ----------------- | --------------------------------------- |
| Story Slides      | Spotify Wrapped style storytelling      |
| Fullscreen Replay | Immersive music recap experience        |
| Auto Progression  | Automatically advances through slides   |
| Replay Controls   | Previous, Next, Play and Replay options |
| Wrapped Summary   | Condensed annual listening overview     |

<br/>

### 🤝 Music Compatibility Engine

| Capability              | Description                             |
| ----------------------- | --------------------------------------- |
| Compatibility Score     | Calculates music taste similarity       |
| Shared Artists          | Finds common artists between users      |
| Shared Tracks           | Detects common tracks between users     |
| Genre Battle            | Compares genre preferences              |
| Personality Match       | Compares listening personalities        |
| Unique Artists Analysis | Highlights exclusive artist preferences |

<br/>

### 🎯 Recommendation Engine

| Capability                   | Description                                  |
| ---------------------------- | -------------------------------------------- |
| Similar Artist Discovery     | Recommends artists based on listening habits |
| Similar Track Discovery      | Suggests tracks related to favorites         |
| Match Percentage Scoring     | Quantifies recommendation relevance          |
| Duplicate Filtering          | Removes already-known artists and tracks     |
| Personalized Recommendations | Generates user-specific discoveries          |

<br/>

### 📤 Share & Export System

| Feature                  | Description                               |
| ------------------------ | ----------------------------------------- |
| Wrapped Share Card       | Generates shareable music summary cards   |
| Compatibility Share Card | Creates compatibility report cards        |
| PNG Export               | Downloads cards as high-quality PNGs      |
| Social Media Ready       | Optimized for sharing on social platforms |
| html2canvas Integration  | Client-side image generation              |

<br/>

### 📈 Listening Intelligence Suite

| Service                     | Output                                    |
| --------------------------- | ----------------------------------------- |
| Hourly Heatmap              | Listening activity across 24 hours        |
| Weekly Trends               | Day-wise listening patterns               |
| Monthly Insights            | Long-term listening evolution             |
| Time Analysis               | Morning, Afternoon, Evening, Night habits |
| Music Personality Detection | Listener archetype classification         |

---

## 🏗️ Architecture

<br/>

```text
╔══════════════════════════════════════════════════════╗
║                    USER LAYER                        ║
║            Browser / Desktop / Mobile App           ║
╚═══════════════════════╤══════════════════════════════╝
                        │
                        ▼
╔══════════════════════════════════════════════════════╗
║                  REACT FRONTEND                     ║
║       Dashboard · Wrapped · Compatibility          ║
╚══════╤══════════════╤══════════════╤════════════════╝
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Wrapped    │ │ Analytics  │ │ Compatibility│
│ Engine     │ │ Dashboard  │ │ Engine      │
└─────┬──────┘ └─────┬──────┘ └─────┬──────┘
      │              │              │
      └──────────────┼──────────────┘
                     │
                     ▼
╔══════════════════════════════════════════════════════╗
║                   FLASK BACKEND                     ║
║        API Layer · Processing · Analytics          ║
╚══════╤══════════════╤══════════════╤════════════════╝
       │              │              │
       ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌────────────┐
│ Music      │ │ Similarity │ │ Recommendation│
│ Analytics  │ │ Engine     │ │ Engine       │
└─────┬──────┘ └────────────┘ └─────┬────────┘
      │                             │
      └──────────────┬──────────────┘
                     │
                     ▼
┌────────────────────────────────────────────┐
│               LAST.FM API                  │
│ Users · Artists · Tracks · Scrobbles       │
│ Tags · Listening History · Metadata        │
└────────────────────────────────────────────┘
```

<br/>

### Service Map

| Service                | Stack                 | Responsibility                            |
| ---------------------- | --------------------- | ----------------------------------------- |
| User Interface         | React + Vite          | Dashboard rendering and user interaction  |
| Wrapped Engine         | React + Framer Motion | Spotify Wrapped style replay experience   |
| Analytics Dashboard    | React + Recharts      | Charts, heatmaps and listening insights   |
| Compatibility Engine   | Python + Flask        | Music similarity calculations             |
| Recommendation Engine  | Python                | Artist and track recommendations          |
| Share Card Generator   | html2canvas           | PNG export and social sharing             |
| Backend API            | Flask                 | Data processing and API endpoints         |
| Music Analytics Engine | Python                | Genre, personality and listening analysis |
| Last.fm Integration    | Last.fm API           | User listening history retrieval          |
| Visualization Layer    | Recharts              | Interactive charts and analytics displays |

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18
npm >= 9
Python >= 3.10
```

You'll also need:

* Last.fm API Key
* Git
* Modern Web Browser (Chrome / Edge / Firefox)

<br/>

### 1 — Clone

```bash
git clone https://github.com/AlbinJosephG/personal-music-analytics-platform.git

cd personal-music-analytics-platform
```

<br/>

### 2 — Frontend Setup

```bash
cd frontend

npm install
```

<br/>

### 3 — Backend Setup

```bash
cd ../backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt
```

<br/>

### 4 — Configure Environment

Create a `.env` file inside the backend folder:

```env
LASTFM_API_KEY=YOUR_LASTFM_API_KEY
LASTFM_BASE_URL=https://ws.audioscrobbler.com/2.0/
```

<br/>

### 5 — Start Backend Server

```bash
cd backend

source venv/bin/activate

python app.py
```

Expected:

```text
✓ Flask Server Running
✓ Last.fm API Connected
✓ Backend Listening on http://localhost:5000
```

<br/>

### 6 — Start Frontend

Open a new terminal:

```bash
cd frontend

npm run dev
```

Expected:

```text
VITE v7.x ready

➜ Local: http://localhost:5173/
```

<br/>

### 7 — Open Application

Visit:

```text
http://localhost:5173
```

Enter your Last.fm username and generate your personalized music dashboard.

<br/>

### Available Features

```text
✓ Music Wrapped Dashboard
✓ Top Artists Analysis
✓ Top Tracks Analysis
✓ Genre Insights
✓ Music Personality Detection
✓ Hourly Listening Heatmap
✓ Weekly Listening Trends
✓ Time-of-Day Analysis
✓ Wrapped Replay Mode
✓ Compatibility Engine
✓ Artist Recommendations
✓ Track Recommendations
✓ Shareable Wrapped Cards
✓ Compatibility Share Cards
```

<br/>

> Application running? Continue to the API Reference section below.

<br/>

---

## 📡 API Reference

<br/>

### User Analytics Services

```text
GET   /profile/<username>                 → User Profile Information

GET   /top-artists/<username>             → Top Artists Analysis

GET   /top-tracks/<username>              → Top Tracks Analysis

GET   /recent-tracks/<username>           → Recent Listening Activity

GET   /genres/<username>                  → Genre Distribution Analysis
```

### Music Intelligence Services

```text
GET   /hourly-heatmap/<username>          → Hourly Listening Heatmap

GET   /weekly-trends/<username>           → Weekly Listening Trends

GET   /time-analysis/<username>           → Listening Time Insights

GET   /personality/<username>             → Music Personality Detection
```

### Recommendation Services

```text
GET   /recommend-artists/<username>       → Similar Artist Recommendations

GET   /recommend-tracks/<username>        → Similar Track Recommendations
```

### Compatibility Services

```text
POST  /compare-users                      → Music Compatibility Analysis
```

### Wrapped Experience Services

```text
GET   /wrapped/<username>                 → Wrapped Dashboard Data

GET   /wrapped-story/<username>           → Replay Story Data

GET   /share-card/<username>              → Share Card Data
```

### Sample Requests

```text
Username: imorasby

Generate Wrapped

Compare:
imorasby
antennaC

Generate Recommendations

View Listening Heatmap

Open Wrapped Replay
```

### Sample Compatibility Request

```json
{
  "user1": "imorasby",
  "user2": "antennaC"
}
```

### Sample Compatibility Response

```json
{
  "compatibilityScore": 50,
  "personalityMatch": 100,
  "sharedArtists": 10,
  "sharedTracks": 5,
  "topSharedArtist": "Anirudh Ravichander"
}
```

<br/>

---

## 🛠 Tech Stack

<br/>

<div align="center">

### Frontend

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square\&logo=vite\&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-0055FF?style=flat-square\&logo=framer)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square)
![html2canvas](https://img.shields.io/badge/html2canvas-22C55E?style=flat-square)

### Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square\&logo=python\&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square\&logo=flask\&logoColor=white)
![Requests](https://img.shields.io/badge/Requests-4B8BBE?style=flat-square)

### Data Source

![Last.fm API](https://img.shields.io/badge/Last.fm-API-D51007?style=flat-square\&logo=lastdotfm\&logoColor=white)

### Development & Deployment

![Git](https://img.shields.io/badge/Git-F05032?style=flat-square\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square\&logo=github\&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square\&logo=npm\&logoColor=white)
![Virtual Environment](https://img.shields.io/badge/Python-Venv-306998?style=flat-square)

### Core Modules

![Wrapped Engine](https://img.shields.io/badge/Wrapped-Engine-1DB954?style=flat-square)

![Music Analytics](https://img.shields.io/badge/Music-Analytics-2563EB?style=flat-square)

![Compatibility Engine](https://img.shields.io/badge/Compatibility-Engine-7C3AED?style=flat-square)

![Recommendation Engine](https://img.shields.io/badge/Recommendation-Engine-D97706?style=flat-square)

![Replay Story](https://img.shields.io/badge/Replay-Story-EC4899?style=flat-square)

![Share Cards](https://img.shields.io/badge/Share-Cards-059669?style=flat-square)

![Listening Heatmap](https://img.shields.io/badge/Listening-Heatmap-E11D48?style=flat-square)

![Personality Detection](https://img.shields.io/badge/Music-Personality-9333EA?style=flat-square)

</div>

<br/>


---

## 📂 Project Structure

```text
personal-music-analytics-platform/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── .env.
│   └── venv/
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       │
│       ├── layout/
│       │   ├── Layout.jsx
│       │   └── Layout.css
│       │
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Dashboard.css
│       │   ├── Compatibility.jsx
│       │   └── Compatibility.css
│       │
│       ├── services/
│       │   └── api.js
│       │
│       └── components/
│           ├── Navbar.jsx
│           ├── Navbar.css
│           ├── Footer.jsx
│           ├── Footer.css
│           │
│           ├── StatsCards.jsx
│           ├── StatsCards.css
│           ├── TopArtistsChart.jsx
│           ├── TopArtistsChart.css
│           ├── TopTracksChart.jsx
│           ├── TopTracksChart.css
│           ├── GenreChart.jsx
│           ├── GenreChart.css
│           │
│           ├── PersonalityCard.jsx
│           ├── PersonalityCard.css
│           ├── WrappedSummary.jsx
│           ├── WrappedSummary.css
│           ├── WrappedStory.jsx
│           ├── WrappedStory.css
│           │
│           ├── ShareCard.jsx
│           ├── ShareCard.css
│           ├── CompatibilityShareCard.jsx
│           ├── CompatibilityShareCard.css
│           │
│           ├── Recommendations.jsx
│           ├── Recommendations.css
│           ├── HourlyHeatmap.jsx
│           ├── HourlyHeatmap.css
│           ├── WeeklyTrends.jsx
│           ├── WeeklyTrends.css
│           ├── TimeAnalysis.jsx
│           ├── TimeAnalysis.css
│           │
│           ├── ProgressLoader.jsx
│           ├── ProgressLoader.css
│           ├── ErrorMessage.jsx
│           ├── ErrorMessage.css
│           ├── Loader.jsx
│           ├── Loader.css
│           ├── Card.jsx
│           └── Card.css
│
├── README.md
├── .gitignore
└── LICENSE
```

<br/>

---

## OUTPUT SCREENSHOTS

<img width="1869" height="579" alt="image" src="https://github.com/user-attachments/assets/68efbc59-9718-4a62-9f94-b42d33430a7b" />
<img width="1885" height="849" alt="image" src="https://github.com/user-attachments/assets/629c5698-b200-40e2-8de9-76094719453b" />
<img width="1881" height="849" alt="image" src="https://github.com/user-attachments/assets/b898b600-2cb6-4b8a-b334-2832e602824f" />
<img width="679" height="779" alt="image" src="https://github.com/user-attachments/assets/9f5d1e34-4437-4476-8a85-ded19368b33b" />



