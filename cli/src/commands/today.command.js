const { getTodayMatches } = require("../services/match.service");
const { printMatches } = require("../utils/printMatches");
const { printEmpty, printError } = require("../utils/messages");

// Command for showing today's matches.
const showTodayMatches = async () => {
  try {
    const matches = await getTodayMatches();

    if (matches.length > 0) {
      printMatches("Today's Matches", matches);
    } else {
      printEmpty("No matches scheduled for today.");
    }
  } catch (error) {
    printError(`Failed to fetch today's matches: ${error.message}`);
  }
};

module.exports = {
  showTodayMatches,
};
