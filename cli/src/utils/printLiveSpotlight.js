const chalk = require("chalk");
const { teamBadge } = require("./teamBadge");
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
      `${teamBadge(match.homeTeam)} ${chalk.bold(match.homeTeam)} ${chalk.dim("vs")} ${teamBadge(match.awayTeam)} ${chalk.bold(match.awayTeam)}`,
    );
  });

  console.log("");
};

module.exports = {
  printLiveSpotlight,
};
