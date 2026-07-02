// Where the CLI looks for the Footy backend.
// Stores the backend URL in the environment variable FOOTY_API_URL
// Defaults to the deployed Render API so `footy` works out of the box.
// When developing new features locally, run the backend and override with:
//   FOOTY_API_URL=http://localhost:3000 footy today
const DEFAULT_API_URL = "https://footy-backend-6iew.onrender.com";

const API_BASE_URL = (process.env.FOOTY_API_URL || DEFAULT_API_URL).replace(
  /\/+$/,
  "",
);

module.exports = {
  API_BASE_URL,
};
