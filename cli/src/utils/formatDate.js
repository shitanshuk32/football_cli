// Single source of truth for how kickoff times are rendered across the CLI.
const formatKickoff = (dateString) =>
  new Date(dateString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

module.exports = {
  formatKickoff,
};
