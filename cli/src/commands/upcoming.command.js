const { getUpcomingMatches } = require("../services/match.service");
const { printMatches } = require("../utils/printMatches");
const { printEmpty, printApiError } = require("../utils/messages");

// Command for showing upcoming matches.
const showUpcomingMatches = async () => {
  try {
    const matches = await getUpcomingMatches();

    if (matches.length > 0) {
      printMatches("Upcoming Matches", matches);
    } else {
      printEmpty("No upcoming matches scheduled.");
    }
  } catch (error) {
    printApiError(error, `Failed to fetch upcoming matches: ${error.message}`);
  }
};

module.exports = {
  showUpcomingMatches,
};
