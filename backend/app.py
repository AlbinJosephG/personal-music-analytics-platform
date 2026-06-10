from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from collections import defaultdict


load_dotenv()

app = Flask(__name__)
CORS(app)

LASTFM_API_KEY = os.getenv("LASTFM_API_KEY")
LASTFM_BASE_URL = os.getenv("LASTFM_BASE_URL")


@app.route("/")
def home():
    return jsonify({
        "message": "Music Wrapped Backend Running with Last.fm"
    })


@app.route("/api/lastfm/profile")
def get_profile():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getinfo",
        "user": username,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    return jsonify(response.json())


@app.route("/api/lastfm/top-artists")
def get_top_artists():
    username = request.args.get("username")
    period = request.args.get("period", "12month")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.gettopartists",
        "user": username,
        "period": period,
        "limit": 10,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    return jsonify(response.json())


@app.route("/api/lastfm/top-tracks")
def get_top_tracks():
    username = request.args.get("username")
    period = request.args.get("period", "12month")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.gettoptracks",
        "user": username,
        "period": period,
        "limit": 10,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    return jsonify(response.json())


@app.route("/api/lastfm/recent-tracks")
def get_recent_tracks():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 20,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    return jsonify(response.json())
@app.route("/api/lastfm/top-genres")
def get_top_genres():
    username = request.args.get("username")
    period = request.args.get("period", "12month")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    artists_params = {
        "method": "user.gettopartists",
        "user": username,
        "period": period,
        "limit": 10,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    artists_response = requests.get(LASTFM_BASE_URL, params=artists_params)
    artists_data = artists_response.json()

    artists = artists_data.get("topartists", {}).get("artist", [])

    genre_count = {}

    for artist in artists:
        artist_name = artist.get("name")

        tags_params = {
            "method": "artist.gettoptags",
            "artist": artist_name,
            "api_key": LASTFM_API_KEY,
            "format": "json"
        }

        tags_response = requests.get(LASTFM_BASE_URL, params=tags_params)
        tags_data = tags_response.json()

        tags = tags_data.get("toptags", {}).get("tag", [])[:3]

        for tag in tags:
            genre = tag.get("name", "Unknown").title()
            genre_count[genre] = genre_count.get(genre, 0) + 1

    sorted_genres = sorted(
        genre_count.items(),
        key=lambda x: x[1],
        reverse=True
    )[:10]

    result = [
        {"name": genre, "value": count}
        for genre, count in sorted_genres
    ]

    return jsonify({"genres": result})

@app.route("/api/lastfm/listening-heatmap")
def listening_heatmap():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 200,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    data = response.json()

    tracks = data.get("recenttracks", {}).get("track", [])

    day_count = defaultdict(int)

    for track in tracks:
        date_info = track.get("date")

        if date_info:
            uts = int(date_info.get("uts"))
            date = datetime.fromtimestamp(uts)
            day_name = date.strftime("%A")
            day_count[day_name] += 1

    result = [
        {"day": "Monday", "plays": day_count["Monday"]},
        {"day": "Tuesday", "plays": day_count["Tuesday"]},
        {"day": "Wednesday", "plays": day_count["Wednesday"]},
        {"day": "Thursday", "plays": day_count["Thursday"]},
        {"day": "Friday", "plays": day_count["Friday"]},
        {"day": "Saturday", "plays": day_count["Saturday"]},
        {"day": "Sunday", "plays": day_count["Sunday"]},
    ]

    return jsonify({"heatmap": result})
@app.route("/api/lastfm/monthly-trends")
def monthly_trends():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 200,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    data = response.json()

    tracks = data.get("recenttracks", {}).get("track", [])

    month_count = defaultdict(int)

    for track in tracks:
        date_info = track.get("date")

        if date_info:
            uts = int(date_info.get("uts"))
            date = datetime.fromtimestamp(uts)
            month_name = date.strftime("%b %Y")
            month_count[month_name] += 1

    result = [
        {"month": month, "plays": plays}
        for month, plays in month_count.items()
    ]

    return jsonify({"monthlyTrends": result})
@app.route("/api/lastfm/time-analysis")
def time_analysis():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 200,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    data = response.json()

    tracks = data.get("recenttracks", {}).get("track", [])

    time_buckets = {
        "Morning": 0,
        "Afternoon": 0,
        "Evening": 0,
        "Night": 0
    }

    for track in tracks:
        date_info = track.get("date")

        if date_info:
            uts = int(date_info.get("uts"))
            date = datetime.fromtimestamp(uts)
            hour = date.hour

            if 5 <= hour < 12:
                time_buckets["Morning"] += 1
            elif 12 <= hour < 17:
                time_buckets["Afternoon"] += 1
            elif 17 <= hour < 21:
                time_buckets["Evening"] += 1
            else:
                time_buckets["Night"] += 1

    favorite_time = max(time_buckets, key=time_buckets.get)

    result = {
        "buckets": [
            {"time": key, "plays": value}
            for key, value in time_buckets.items()
        ],
        "favoriteTime": favorite_time
    }

    return jsonify(result)
@app.route("/api/lastfm/recommend-artists")
def recommend_artists():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    top_artists_params = {
        "method": "user.gettopartists",
        "user": username,
        "period": "12month",
        "limit": 20,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    top_artists_response = requests.get(LASTFM_BASE_URL, params=top_artists_params)
    top_artists_data = top_artists_response.json()

    top_artists = top_artists_data.get("topartists", {}).get("artist", [])

    user_top_artist_names = {
        artist.get("name", "").lower()
        for artist in top_artists
        if artist.get("name")
    }

    recommendations = []
    seen = set()

    for artist in top_artists[:5]:
        artist_name = artist.get("name")

        similar_params = {
            "method": "artist.getsimilar",
            "artist": artist_name,
            "limit": 8,
            "api_key": LASTFM_API_KEY,
            "format": "json"
        }

        similar_response = requests.get(LASTFM_BASE_URL, params=similar_params)
        similar_data = similar_response.json()

        similar_artists = similar_data.get("similarartists", {}).get("artist", [])

        for similar in similar_artists:
            name = similar.get("name")
            normalized_name = name.lower() if name else ""

            if not name:
                continue

            if normalized_name in user_top_artist_names:
                continue

            if normalized_name in seen:
                continue

            seen.add(normalized_name)

            recommendations.append({
                "name": name,
                "match": round(float(similar.get("match", 0)) * 100, 2),
                "basedOn": artist_name,
                "url": similar.get("url")
            })

    recommendations = sorted(
        recommendations,
        key=lambda x: x["match"],
        reverse=True
    )[:10]

    return jsonify({"recommendedArtists": recommendations})
@app.route("/api/lastfm/recommend-tracks")
def recommend_tracks():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    top_tracks_params = {
        "method": "user.gettoptracks",
        "user": username,
        "period": "12month",
        "limit": 5,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    top_tracks_response = requests.get(LASTFM_BASE_URL, params=top_tracks_params)
    top_tracks_data = top_tracks_response.json()

    top_tracks = top_tracks_data.get("toptracks", {}).get("track", [])

    recommendations = []
    seen = set()

    for track in top_tracks:
        track_name = track.get("name")
        artist_name = track.get("artist", {}).get("name")

        if not track_name or not artist_name:
            continue

        similar_params = {
            "method": "track.getsimilar",
            "track": track_name,
            "artist": artist_name,
            "limit": 5,
            "api_key": LASTFM_API_KEY,
            "format": "json"
        }

        similar_response = requests.get(LASTFM_BASE_URL, params=similar_params)
        similar_data = similar_response.json()

        similar_tracks = similar_data.get("similartracks", {}).get("track", [])

        for similar in similar_tracks:
            name = similar.get("name")
            artist = similar.get("artist", {}).get("name", "Unknown Artist")
            key = f"{name}-{artist}"

            if name and key not in seen:
                seen.add(key)

                recommendations.append({
                    "name": name,
                    "artist": artist,
                    "match": round(float(similar.get("match", 0)) * 100, 2),
                    "basedOn": track_name,
                    "url": similar.get("url")
                })

    recommendations = sorted(
        recommendations,
        key=lambda x: x["match"],
        reverse=True
    )[:10]

    return jsonify({"recommendedTracks": recommendations})
@app.route("/api/lastfm/compare-users")
def compare_users():
    user1 = request.args.get("user1")
    user2 = request.args.get("user2")

    if not user1 or not user2:
        return jsonify({"error": "Both user1 and user2 are required"}), 400

    BAD_GENRES = {
        "All",
        "Seen Live",
        "Composer",
        "Favorite",
        "Favourites",
        "Favorites",
        "My Favorite",
        "Under 2000 Listeners",
        "Kathali Kathali",
    }

    def clean_genre(tag_name):
        if not tag_name:
            return None

        genre = tag_name.strip().title()

        if genre.isnumeric():
            return None

        if genre in BAD_GENRES:
            return None

        if len(genre) <= 1:
            return None

        return genre

    def get_user_top_artists(username):
        params = {
            "method": "user.gettopartists",
            "user": username,
            "period": "12month",
            "limit": 20,
            "api_key": LASTFM_API_KEY,
            "format": "json"
        }

        response = requests.get(LASTFM_BASE_URL, params=params)
        data = response.json()
        artists = data.get("topartists", {}).get("artist", [])

        return {
            artist.get("name"): int(artist.get("playcount", 0))
            for artist in artists
            if artist.get("name")
        }

    def get_user_top_tracks(username):
        params = {
            "method": "user.gettoptracks",
            "user": username,
            "period": "12month",
            "limit": 20,
            "api_key": LASTFM_API_KEY,
            "format": "json"
        }

        response = requests.get(LASTFM_BASE_URL, params=params)
        data = response.json()
        tracks = data.get("toptracks", {}).get("track", [])

        return {
            track.get("name"): int(track.get("playcount", 0))
            for track in tracks
            if track.get("name")
        }

    def get_user_genres(artists_dict):
        genre_count = {}

        for artist_name in list(artists_dict.keys())[:10]:
            params = {
                "method": "artist.gettoptags",
                "artist": artist_name,
                "api_key": LASTFM_API_KEY,
                "format": "json"
            }

            response = requests.get(LASTFM_BASE_URL, params=params)
            data = response.json()
            tags = data.get("toptags", {}).get("tag", [])[:5]

            for tag in tags:
                genre = clean_genre(tag.get("name"))

                if genre:
                    genre_count[genre] = genre_count.get(genre, 0) + 1

        return genre_count

    user1_artists = get_user_top_artists(user1)
    user2_artists = get_user_top_artists(user2)

    user1_tracks = get_user_top_tracks(user1)
    user2_tracks = get_user_top_tracks(user2)

    user1_genres = get_user_genres(user1_artists)
    user2_genres = get_user_genres(user2_artists)

    common_artists = set(user1_artists.keys()) & set(user2_artists.keys())
    common_tracks = set(user1_tracks.keys()) & set(user2_tracks.keys())
    common_genres = set(user1_genres.keys()) & set(user2_genres.keys())

    unique_user1 = set(user1_artists.keys()) - set(user2_artists.keys())
    unique_user2 = set(user2_artists.keys()) - set(user1_artists.keys())

    shared_artists = [
        {
            "name": artist,
            "user1Plays": user1_artists.get(artist, 0),
            "user2Plays": user2_artists.get(artist, 0),
            "totalPlays": user1_artists.get(artist, 0) + user2_artists.get(artist, 0)
        }
        for artist in common_artists
    ]

    shared_artists = sorted(
        shared_artists,
        key=lambda x: x["totalPlays"],
        reverse=True
    )

    shared_tracks = [
        {
            "name": track,
            "user1Plays": user1_tracks.get(track, 0),
            "user2Plays": user2_tracks.get(track, 0),
            "totalPlays": user1_tracks.get(track, 0) + user2_tracks.get(track, 0)
        }
        for track in common_tracks
    ]

    shared_tracks = sorted(
        shared_tracks,
        key=lambda x: x["totalPlays"],
        reverse=True
    )

    genre_battle = [
        {
            "genre": genre,
            "user1Score": user1_genres.get(genre, 0),
            "user2Score": user2_genres.get(genre, 0),
            "combinedScore": user1_genres.get(genre, 0) + user2_genres.get(genre, 0)
        }
        for genre in set(user1_genres.keys()) | set(user2_genres.keys())
    ]

    genre_battle = sorted(
        genre_battle,
        key=lambda x: x["combinedScore"],
        reverse=True
    )[:8]

    artist_score = (len(common_artists) / 20) * 40
    track_score = (len(common_tracks) / 20) * 25
    genre_score = (
        len(common_genres)
        / max(len(set(user1_genres.keys()) | set(user2_genres.keys())), 1)
    ) * 35

    compatibility_score = round(artist_score + track_score + genre_score)

    def personality(artists, genres):
        top_artist_plays = max(artists.values()) if artists else 0
        genre_count = len(genres)

        if top_artist_plays >= 50:
            return "Loyal Fan"
        if genre_count >= 8:
            return "Genre Explorer"
        if genre_count >= 5:
            return "Balanced Listener"
        return "Casual Listener"

    user1_personality = personality(user1_artists, user1_genres)
    user2_personality = personality(user2_artists, user2_genres)

    personality_match = 100 if user1_personality == user2_personality else 70

    return jsonify({
        "user1": user1,
        "user2": user2,
        "compatibilityScore": compatibility_score,
        "sharedArtists": shared_artists,
        "sharedTracks": shared_tracks,
        "genreBattle": genre_battle,
        "user1Personality": user1_personality,
        "user2Personality": user2_personality,
        "personalityMatch": personality_match,
        "uniqueUser1": list(unique_user1)[:10],
        "uniqueUser2": list(unique_user2)[:10]
    })
@app.route("/api/lastfm/hourly-heatmap")
def hourly_heatmap():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 200,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    data = response.json()

    tracks = data.get("recenttracks", {}).get("track", [])

    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    heatmap = {}

    for day in days:
        heatmap[day] = {}
        for hour in range(24):
            heatmap[day][hour] = 0

    for track in tracks:
        date_info = track.get("date")

        if date_info:
            uts = int(date_info.get("uts"))
            date = datetime.fromtimestamp(uts)

            day_name = date.strftime("%A")
            hour = date.hour

            heatmap[day_name][hour] += 1

    result = []

    for day in days:
        for hour in range(24):
            result.append({
                "day": day,
                "hour": hour,
                "plays": heatmap[day][hour]
            })

    return jsonify({"hourlyHeatmap": result})
@app.route("/api/lastfm/weekly-trends")
def weekly_trends():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "Last.fm username is required"}), 400

    params = {
        "method": "user.getrecenttracks",
        "user": username,
        "limit": 200,
        "api_key": LASTFM_API_KEY,
        "format": "json"
    }

    response = requests.get(LASTFM_BASE_URL, params=params)
    data = response.json()

    tracks = data.get("recenttracks", {}).get("track", [])

    daily_count = {}

    for i in range(6, -1, -1):
        day = datetime.now() - timedelta(days=i)
        key = day.strftime("%Y-%m-%d")
        label = day.strftime("%b %d")
        daily_count[key] = {
            "date": label,
            "plays": 0
        }

    for track in tracks:
        date_info = track.get("date")

        if date_info:
            uts = int(date_info.get("uts"))
            date = datetime.fromtimestamp(uts)
            key = date.strftime("%Y-%m-%d")

            if key in daily_count:
                daily_count[key]["plays"] += 1

    result = list(daily_count.values())

    return jsonify({"weeklyTrends": result})

if __name__ == "__main__":
    app.run(debug=True, port=5000)