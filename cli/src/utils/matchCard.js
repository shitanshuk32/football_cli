const boxen = require("boxen");
const chalk = require("chalk");
const { getFlag } = require("./teamFlags");
const { formatStatus } = require("./statusFormat");
const { formatKickoff } = require("./formatDate");

// Centers the "VS" separator relative to the two team rows.
const centerVs = (homeLine, awayLine) => {
  const width = Math.max(homeLine.length, awayLine.length);
  const pad = Math.max(0, Math.floor((width - 2) / 2));
  return " ".repeat(pad) + "VS";
};

// Builds a broadcast-style scoreboard card where the teams are the focus:
//
//   🇦🇷 Argentina
//        VS
//   🇩🇿 Algeria
//
//   ✅ FINISHED
//   🕒 Jun 17, 2026, 1:00 AM UTC
//
const buildMatchCard = (match) => {
  const home = `${getFlag(match.homeTeam)} ${match.homeTeam}`;
  const away = `${getFlag(match.awayTeam)} ${match.awayTeam}`;
  const status = formatStatus(match.status);

  const content = [
    chalk.bold.white(home),
    chalk.dim(centerVs(home, away)),
    chalk.bold.white(away),
    "",
    status.badge,
    chalk.dim(`🕒 ${formatKickoff(match.kickoff)} UTC`),
  ].join("\n");

  return boxen(content, {
    padding: { top: 0, bottom: 0, left: 2, right: 2 },
    margin: { top: 0, bottom: 1, left: 0, right: 0 },
    borderStyle: "round",
    borderColor: status.border,
  });
};

module.exports = {
  buildMatchCard,
};
