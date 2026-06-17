/*
No network request happens here. 
This file only creates and exports the client.
*/

const axios = require("axios");

// Create axios instance
const footballApi = axios.create({
  baseURL: "https://api.football-data.org/v4",
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY, //
  },
});

// Export axios instance
module.exports = footballApi;
