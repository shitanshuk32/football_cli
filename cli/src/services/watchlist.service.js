const http = require("../config/http");

const addTeamToWatchlist = async (deviceId, team, code) => {
  const response = await http.post("/api/v1/watchlist", {
    deviceId,
    team,
    code,
  });

  return response.data;
};

const getWatchlist = async (deviceId) => {
  const response = await http.get(`/api/v1/watchlist/${deviceId}`);

  return response.data.data;
};

const removeTeamFromWatchlist = async (deviceId, code) => {
  const response = await http.delete("/api/v1/watchlist", {
    data: {
      deviceId,
      code,
    },
  });

  return response.data;
};

module.exports = {
  addTeamToWatchlist,
  getWatchlist,
  removeTeamFromWatchlist,
};
