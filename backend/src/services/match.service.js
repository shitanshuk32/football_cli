const footballApi = require("../config/footballApi");
// const AppError = require("../utils/AppError");

// Helper function to format matches data
const formatMatches = (matches) => {
  return matches.map((match) => ({
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    status: match.status,
    kickoff: match.utcDate,
  }));
};

// Service for getting live matches data
const getLiveMatchesData = async () => {
  try {
    // Make network request to get live matches data
    const response = await footballApi.get("/matches");

    //Format Matches
    let matches = formatMatches(response.data.matches);

    return matches;
  } catch (error) {
    console.error(error.message);

    throw new Error("Football API exploded");
  }
};

// Service for getting matches data.
const getMatchesData = async ({ status, team, date }) => {
  const normalizedTeam = team?.trim().toLowerCase();
  const response = await footballApi.get("/matches");

  // Format matches
  let matches = formatMatches(response.data.matches);

  // If status is provided, filter matches by status
  if (status) {
    matches = matches.filter((match) => match.status === status);
  }

  // If team is provided, filter matches by team
  if (team) {
    matches = matches.filter(
      (match) =>
        match.homeTeam.toLowerCase() === normalizedTeam ||
        match.awayTeam.toLowerCase() === normalizedTeam,
    );
  }

  // If date is provided, filter matches by calendar day (YYYY-MM-DD)
  if (date) {
    matches = matches.filter((match) => match.kickoff.slice(0, 10) === date);
  }

  return matches;
};

// Service for getting today's matches.
const getTodayMatchesData = async () => {
  const response = await footballApi.get("/matches");

  // Format matches
  let matches = formatMatches(response.data.matches);

  const today = new Date().toISOString().slice(0, 10);

  // Keep only matches kicking off today (UTC)
  matches = matches.filter((match) => match.kickoff.slice(0, 10) === today);

  // Sort by kickoff time
  matches.sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  return matches;
};

// Service for getting upcoming data.
const getUpcomingMatchesData = async () => {
  const response = await footballApi.get("/matches");

  //Format Matches
  let matches = formatMatches(response.data.matches);

  const now = new Date();

  // Filter all upcoming matches for any team
  matches = matches.filter(
    (match) => match.status === "TIMED" && new Date(match.kickoff) > now,
  );

  //Sort
  matches.sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  return matches;
};

module.exports = {
  getLiveMatchesData,
  getMatchesData,
  getUpcomingMatchesData,
  getTodayMatchesData,
};
