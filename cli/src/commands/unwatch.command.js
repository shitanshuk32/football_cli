const chalk = require("chalk");

const { getDeviceId } = require("../utils/device");

const { findTeam } = require("../utils/findTeam");
const { badgeForCode } = require("../utils/teamBadge");
const { removeTeamFromWatchlist } = require("../services/watchlist.service");

// Command for unwatching a team
const unwatchTeam = async (teamName) => {
  const team = findTeam(teamName);

  // If the team is not found, print an error message and return
  if (!team) {
    console.log("");
    console.log(chalk.red(`❌ Team not found: ${chalk.bold(teamName)}`));
    console.log(chalk.dim("   Try: footy unwatch Brazil"));
    console.log("");

    return;
  }

  // Get the device id
  const deviceId = getDeviceId();

  // Remove the team from the watchlist
  await removeTeamFromWatchlist(deviceId, team.code);

  // Print a confirmation styled to match the watchlist view
  console.log("");
  console.log(chalk.bold.red("💔 Removed from Watchlist"));
  console.log("");
  console.log(
    `  ${badgeForCode(team.code)}    ${chalk.strikethrough.dim(
      team.name.toUpperCase(),
    )}`,
  );
  console.log("");
  console.log(chalk.dim("   See who's left: footy watchlist"));
  console.log("");
};

module.exports = {
  unwatchTeam,
};
