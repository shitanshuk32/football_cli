require("dotenv").config();

// Required environment variables. MONGODB_URI is needed for the watchlist
// feature; without it connectDb() exits the process on boot, which on Render
// silently fails the deploy and rolls back to the previous build.
const requiredEnvVars = ["PORT", "FOOTBALL_API_KEY", "MONGODB_URI"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is missing`);
  }
});

module.exports = {
  PORT: process.env.PORT,
  FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
};
