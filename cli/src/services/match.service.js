const axios = require("axios");

// Service for getting all matches.
const getAllMatches = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/matches");

  return response.data.matches;
};

// Service for getting upcoming matches.
const getUpcomingMatches = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/matches/upcoming",
  );

  return response.data.matches;
};

// Service for getting live matches
const getLiveMatches = async (status) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/matches?status=${status}`,
  );

  return response.data.matches;
};

// Service for getting team matches.
const getTeamMatches = async (team) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/matches?team=${team}`,
  );

  return response.data.matches;
};

// Service for getting today's matches.
const getTodayMatches = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/v1/matches/today",
  );

  return response.data.matches;
};

module.exports = {
  getAllMatches,
  getUpcomingMatches,
  getLiveMatches,
  getTeamMatches,
  getTodayMatches,
};
