import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getProfile = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/profile?username=${username}`);
};

export const getTopArtists = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/top-artists?username=${username}`);
};

export const getTopTracks = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/top-tracks?username=${username}`);
};

export const getRecentTracks = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/recent-tracks?username=${username}`);
};

export const getTopGenres = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/top-genres?username=${username}`);
};
export const getListeningHeatmap = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/listening-heatmap?username=${username}`);
};

export const getMonthlyTrends = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/monthly-trends?username=${username}`);
};

export const getTimeAnalysis = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/time-analysis?username=${username}`);
};
export const getRecommendedArtists = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/recommend-artists?username=${username}`);
};

export const getRecommendedTracks = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/recommend-tracks?username=${username}`);
};
export const compareUsers = (user1, user2) => {
  return axios.get(
    `${API_BASE_URL}/api/lastfm/compare-users?user1=${user1}&user2=${user2}`
  );
};
export const getHourlyHeatmap = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/hourly-heatmap?username=${username}`);
};
export const getWeeklyTrends = (username) => {
  return axios.get(`${API_BASE_URL}/api/lastfm/weekly-trends?username=${username}`);
};