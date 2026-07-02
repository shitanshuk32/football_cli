const Watchlist = require("../models/watchlist.model");

// Service for adding a team to the watchlist
const addTeamToWatchlist = async (deviceId, team, code) => {
  // Check if the team is already in the watchlist
  const existingTeam = await Watchlist.findOne({
    deviceId,
    code,
  });

  // Idempotent operation, if the team is already in the watchlist,
  // return the existing team with a success message
  if (existingTeam) {
    return {
      success: true,
      message: `Already watching ${team}`,
    };
  }

  // Create the watchlist item
  await Watchlist.create({ deviceId, team, code });

  return {
    success: true,
    message: `${team} added to watchlist`,
  };
};

// Service for getting the watchlist
const getWatchlistService = async (deviceId) => {
  // Get the watchlist for the device
  const watchlist = await Watchlist.find({
    // Filter the watchlist by deviceId
    deviceId,
  })
    .sort({
      // Sort the watchlist by createdAt in descending order
      createdAt: -1,
    })
    .lean(); // This is to return the watchlist as a plain object and is slightly faster than the default object

  return {
    success: true,
    data: watchlist,
  };
};

// Service for removing a team from the watchlist
const removeTeamFromWatchlist = async (deviceId, code) => {
  // Find the team in the watchlist and delete it
  const deletedTeam = await Watchlist.findOneAndDelete({
    deviceId,
    code,
  });

  // Idempotent operation
  // If the team is not in the watchlist, return a success message
  if (!deletedTeam) {
    return {
      success: true,
      message: "Team is not in your watchlist",
    };
  }

  // Return the deleted team with a success message
  return {
    success: true,
    message: `${deletedTeam.team} removed from watchlist`,
  };
};

// Export the watchlist services
module.exports = {
  addTeamToWatchlist,
  getWatchlistService,
  removeTeamFromWatchlist,
};
