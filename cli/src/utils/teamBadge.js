const chalk = require("chalk");
const TEAMS = require("../constants/teams");

// Badge background palette. A team's code is hashed into this list so each
// team always gets the same distinct color across runs and across screens.
const BADGE_COLORS = [
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgRedBright",
  "bgGreenBright",
  "bgYellowBright",
  "bgBlueBright",
  "bgMagentaBright",
  "bgCyanBright",
];

// Deterministically pick a background color from a team code.
const colorForCode = (code) => {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash + code.charCodeAt(i)) % BADGE_COLORS.length;
  }
  return BADGE_COLORS[hash];
};

// Resolve a stable 3-letter code for a team name. Uses the known team list
// first, then falls back to the first three letters so it always renders.
const codeForTeam = (name) => {
  const match = TEAMS.find(
    (team) => team.name.toLowerCase() === (name || "").toLowerCase(),
  );
  if (match) return match.code;

  const letters = (name || "").replace(/[^a-zA-Z]/g, "");
  return (letters.slice(0, 3) || "???").toUpperCase().padEnd(3, "?");
};

// A colored, fixed-width badge from an explicit code, e.g. " BRA ".
const badgeForCode = (code) => chalk.bold[colorForCode(code)].black(` ${code} `);

// A colored, fixed-width badge resolved from a team name.
const teamBadge = (name) => badgeForCode(codeForTeam(name));

module.exports = {
  teamBadge,
  badgeForCode,
  codeForTeam,
};
