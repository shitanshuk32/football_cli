require("dotenv").config();

// Required environment variables
const requiredEnvVars = ["PORT", "FOOTBALL_API_KEY"];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} environment variable is missing`);
  }
});

module.exports = {
  PORT: process.env.PORT,
  FOOTBALL_API_KEY: process.env.FOOTBALL_API_KEY,
};
