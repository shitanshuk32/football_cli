// Single source of truth for how kickoff times are rendered across the CLI.
// Rendered in India Standard Time (Asia/Kolkata).
const formatKickoff = (dateString) =>
  new Date(dateString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });

// Human-friendly countdown to a future kickoff, e.g. "in 4h 20m".
// Returns null for past kickoffs so callers can omit it.
const relativeToNow = (dateString) => {
  const diffMs = new Date(dateString).getTime() - Date.now();
  if (diffMs <= 0) return null;

  const minutes = Math.round(diffMs / 60000);
  if (minutes < 60) return `in ${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (hours < 24) {
    return remMinutes ? `in ${hours}h ${remMinutes}m` : `in ${hours}h`;
  }

  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return remHours ? `in ${days}d ${remHours}h` : `in ${days}d`;
};

module.exports = {
  formatKickoff,
  relativeToNow,
};
