const { getLiveMatches } = require("../services/match.service");
const { printMatches } = require("../utils/printMatches");
const { printLiveSpotlight } = require("../utils/printLiveSpotlight");
const { printEmpty, printError } = require("../utils/messages");
const { showUpcomingMatches } = require("./upcoming.command");

// Command for showing live matches.
const showLiveMatches = async () => {
  try {
    const matches = await getLiveMatches();

    if (matches.length > 0) {
      printLiveSpotlight(matches);
      printMatches("Live Matches", matches);
    } else {
      printEmpty("No live matches currently in play.");
      await showUpcomingMatches();
    }
  } catch (error) {
    printError(`Failed to fetch live matches: ${error.message}`);
  }
};

module.exports = {
  showLiveMatches,
};
