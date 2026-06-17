const chalk = require("chalk");
const { getFlag } = require("./teamFlags");
const { divider } = require("./theme");

// Hero section shown ONLY when live matches exist, before the cards.
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔴 LIVE NOW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// 🇦🇹 Austria vs 🇯🇴 Jordan
//
const printLiveSpotlight = (matches) => {
  if (!matches.length) return;

  const line = chalk.red(divider("━"));

  console.log("");
  console.log(line);
  console.log(chalk.red.bold("🔴 LIVE NOW"));
  console.log(line);
  console.log("");

  matches.forEach((match) => {
    console.log(
      chalk.bold(
        `${getFlag(match.homeTeam)} ${match.homeTeam} vs ${getFlag(match.awayTeam)} ${match.awayTeam}`,
      ),
    );
  });

  console.log("");
};

module.exports = {
  printLiveSpotlight,
};
