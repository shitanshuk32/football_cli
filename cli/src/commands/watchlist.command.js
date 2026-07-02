const chalk = require("chalk");

const { getDeviceId } = require("../utils/device");
const { badgeForCode } = require("../utils/teamBadge");
const { getWatchlist } = require("../services/watchlist.service");
const { printApiError } = require("../utils/messages");

// Command for showing the watchlist
const showWatchlist = async () => {
  // Get the device id
  const deviceId = getDeviceId();

  let watchlist;

  try {
    // Get the watchlist
    watchlist = await getWatchlist(deviceId);
  } catch (error) {
    printApiError(error, `Failed to fetch your watchlist: ${error.message}`);
    return;
  }

  // If the watchlist is empty, print an error message and return
  if (watchlist.length === 0) {
    console.log("");
    console.log(chalk.bold.yellow("⭐ Your Watchlist"));
    console.log("");
    console.log(chalk.dim("You aren't watching any teams yet."));
    console.log("");
    console.log(chalk.dim("Start with: footy watch Brazil"));
    console.log("");

    return;
  }

  // Print the watchlist
  console.log("");
  console.log(chalk.bold.yellow("⭐ Your Watchlist"));
  console.log("");

  // Print the watchlist items, with a blank line between each so the colored
  // badges don't touch vertically.
  watchlist.forEach((item) => {
    console.log(`  ${badgeForCode(item.code)}    ${chalk.white(item.team)}`);
    console.log("");
  });
};

module.exports = {
  showWatchlist,
};
