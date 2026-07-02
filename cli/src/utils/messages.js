const chalk = require("chalk");

// Shown while we wait on the backend (see utils/spinner.js).
const CONNECTING_MESSAGE = "Connecting to Footy servers...";

// Consistent, intentional empty state (e.g. "No matches found for Brazil.").
const printEmpty = (message) => {
  console.log("");
  console.log(chalk.yellow(`⚽ ${message}`));
  console.log("");
};

// Consistent error state used by every command's catch block.
const printError = (message) => {
  console.log("");
  console.log(chalk.red(`✖ ${message}`));
  console.log("");
};

// Error state that knows about Render's cold starts. When the backend has
// spun down, the first request times out (ECONNABORTED) or the socket hangs
// (ETIMEDOUT) — that's not a real failure, the server is just waking up.
const printApiError = (error, fallback) => {
  if (error && (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT")) {
    printError("Server is waking up. Please try again in a few seconds.");
    return;
  }

  printError(fallback);
};

// Friendly "unknown command" guidance.
const printUnknownCommand = (command) => {
  console.log("");
  console.log(chalk.red(`✖ Unknown command: ${command}`));
  console.log("");
  console.log(chalk.dim("Try:"));
  console.log("  footy help");
  console.log("");
};

module.exports = {
  CONNECTING_MESSAGE,
  printEmpty,
  printError,
  printApiError,
  printUnknownCommand,
};
