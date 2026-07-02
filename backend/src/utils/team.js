// Utility for finding a team by name
// This is a list of all the teams in the world
const TEAMS = require("../constants/teams");

const findTeamByName = (teamName) => {
  // Find the team by name
  const team = TEAMS.find(
    (team) => team.name.toUpperCase() === teamName.toUpperCase(),
  );

  // If the team is not found, return null
  if (!team) {
    return null;
  }

  // Return the team
  return team;
};

// Export the team utility
module.exports = {
  findTeamByName,
};
