const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const {
  addTeamToWatchlist,
  getWatchlistService,
  removeTeamFromWatchlist,
} = require("../services/watchlist.service");

// POST api/v1/watchlist
const addTeam = asyncHandler(async (req, res) => {
  const { deviceId, team, code } = req.body;

  if (!deviceId || !team || !code) {
    throw new AppError("Missing required fields", 400);
  }

  const response = await addTeamToWatchlist(deviceId, team, code);

  return res.status(200).json(response);
});

// GET api/v1/watchlist/:deviceId
const getWatchlist = asyncHandler(async (req, res) => {
  const { deviceId } = req.params;

  if (!deviceId) {
    throw new AppError("Missing required fields", 400);
  }

  const response = await getWatchlistService(deviceId);

  return res.status(200).json(response);
});

// DELETE api/v1/watchlist
const removeTeam = asyncHandler(async (req, res) => {
  const { deviceId, code } = req.body;

  if (!deviceId || !code) {
    throw new AppError("Missing required fields", 400);
  }

  const response = await removeTeamFromWatchlist(deviceId, code);

  return res.status(200).json(response);
});

module.exports = {
  addTeam,
  getWatchlist,
  removeTeam,
};
