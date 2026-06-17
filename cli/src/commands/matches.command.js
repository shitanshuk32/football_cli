const { getAllMatches } = require("../services/match.service");
const { printMatches } = require("../utils/printMatches");
const { printEmpty, printError } = require("../utils/messages");

// Command for showing all matches.
const showAllMatches = async () => {
  try {
    const matches = await getAllMatches();

    if (matches.length > 0) {
      printMatches("All Matches", matches);
    } else {
      printEmpty("No matches found.");
    }
  } catch (error) {
    printError(`Failed to fetch all matches: ${error.message}`);
  }
};

module.exports = {
  showAllMatches,
};
