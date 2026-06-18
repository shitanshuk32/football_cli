const axios = require("axios");
const { API_BASE_URL } = require("../config/api");

const MATCHES_URL = `${API_BASE_URL}/api/v1/matches`;

// Service for getting all matches.
const getAllMatches = async () => {
  const response = await axios.get(MATCHES_URL);

  return response.data.matches;
};

// Service for getting upcoming matches.
const getUpcomingMatches = async () => {
  const response = await axios.get(`${MATCHES_URL}/upcoming`);

  return response.data.matches;
};

// Service for getting live matches
const getLiveMatches = async (status) => {
  const response = await axios.get(`${MATCHES_URL}?status=${status}`);

  return response.data.matches;
};

// Service for getting team matches.
const getTeamMatches = async (team) => {
  const response = await axios.get(
    `${MATCHES_URL}?team=${encodeURIComponent(team)}`,
  );

  return response.data.matches;
};

// Service for getting today's matches.
const getTodayMatches = async () => {
  const response = await axios.get(`${MATCHES_URL}/today`);

  return response.data.matches;
};

module.exports = {
  getAllMatches,
  getUpcomingMatches,
  getLiveMatches,
  getTeamMatches,
  getTodayMatches,
};
