const {
  getLiveMatchesData,
  getMatchesData,
  getUpcomingMatchesData,
  getTodayMatchesData,
} = require("../services/match.service");
const asyncHandler = require("../utils/asyncHandler");

// Controller for getting live matches
// api/v1/matches/live
const getLiveMatches = asyncHandler(async (req, res) => {
  const matches = await getLiveMatchesData();

  return res.status(200).json({
    success: true,
    matches,
  });
});

// Controller for getting matches
// api/v1/matches?status=TIMED
const getMatches = asyncHandler(async (req, res) => {
  const { status, team, date } = req.query;
  const matches = await getMatchesData({ status, team, date });

  return res.status(200).json({
    success: true,
    matches,
  });
});

// Controller for getting upcoming matches.
// /api/v1/matches/upcoming

const getUpcomingMatches = asyncHandler(async (req, res) => {
  const { team } = req.query;
  const matches = await getUpcomingMatchesData();

  return res.status(200).json({
    success: true,
    matches,
  });
});

// Controller for getting today's matches.
// /api/v1/matches/today
const getTodayMatches = asyncHandler(async (req, res) => {
  const matches = await getTodayMatchesData();

  return res.status(200).json({
    success: true,
    matches,
  });
});

module.exports = {
  getLiveMatches,
  getMatches,
  getUpcomingMatches,
  getTodayMatches,
};
