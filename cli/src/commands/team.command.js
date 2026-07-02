const { getTeamMatches } = require("../services/match.service");
const { printMatches } = require("../utils/printMatches");
const { printEmpty, printApiError } = require("../utils/messages");

// Command for showing team matches.
const showTeamMatches = async (teamName) => {
  try {
    const matches = await getTeamMatches(teamName);

    if (matches.length > 0) {
      printMatches(`${teamName} Matches`, matches);
    } else {
      printEmpty(`No matches found for ${teamName}.`);
    }
  } catch (error) {
    printApiError(error, `Failed to fetch ${teamName} matches: ${error.message}`);
  }
};

module.exports = {
  showTeamMatches,
};
