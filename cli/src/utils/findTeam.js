const TEAMS = require("../constants/teams");

// Find a team by name
const findTeam = (input) => {
  return TEAMS.find((team) => team.name.toLowerCase() === input.toLowerCase());
};

// Find a team by its code (e.g. "BRA")
const findTeamByCode = (code) => {
  return TEAMS.find((team) => team.code === code);
};

// Get a team's flag emoji by code, falling back to a soccer ball
const getFlag = (code) => {
  const team = findTeamByCode(code);
  return team ? team.flag : "⚽";
};

module.exports = {
  findTeam,
  findTeamByCode,
  getFlag,
};
