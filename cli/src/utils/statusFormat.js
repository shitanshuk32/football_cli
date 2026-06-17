const chalk = require("chalk");

// Maps an API match status to its label, color, and border accent.
// Centralizing this keeps LIVE/UPCOMING/FINISHED styling identical everywhere.
const STATUS_STYLES = {
  IN_PLAY: { label: "🔴 LIVE NOW", color: chalk.red, border: "red" },
  PAUSED: { label: "🔴 LIVE NOW", color: chalk.red, border: "red" },
  TIMED: { label: "⏳ UPCOMING", color: chalk.yellow, border: "yellow" },
  SCHEDULED: { label: "⏳ UPCOMING", color: chalk.yellow, border: "yellow" },
  FINISHED: { label: "✅ FINISHED", color: chalk.green, border: "green" },
};

const DEFAULT_STYLE = { label: "• UNKNOWN", color: chalk.gray, border: "gray" };

// Returns a consistent style object for a given status.
const formatStatus = (status) => {
  const style = STATUS_STYLES[status] || {
    ...DEFAULT_STYLE,
    label: status || DEFAULT_STYLE.label,
  };

  return {
    badge: style.color.bold(style.label),
    border: style.border,
    color: style.color,
  };
};

module.exports = {
  formatStatus,
};
