const chalk = require("chalk");

const { getDeviceId } = require("../utils/device");

const { findTeam } = require("../utils/findTeam");

const { addTeamToWatchlist } = require("../services/watchlist.service");

// Command for watching a team
const watchTeam = async (teamName) => {
  const team = findTeam(teamName);

  // If the team is not found, print an error message and return
  if (!team) {
    console.log(chalk.red(`❌ Team not found: ${teamName}`));

    console.log(chalk.dim("Try: footy watch Brazil"));

    return;
  }

  // Get the device id
  const deviceId = getDeviceId();

  // Add the team to the watchlist
  const response = await addTeamToWatchlist(deviceId, team.name, team.code);

  // Print the response message
  console.log(chalk.green(`✅ ${response.message}`));
};

module.exports = {
  watchTeam,
};
