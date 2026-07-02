const chalk = require("chalk");

// Maps an API match status to its glyph, label, color, and border accent.
// Centralizing this keeps LIVE/UPCOMING/FINISHED styling identical everywhere.
// Glyphs are single characters that render consistently in any terminal.
const STATUS_STYLES = {
  IN_PLAY: { glyph: "●", label: "LIVE NOW", color: chalk.red, border: "red" },
  PAUSED: { glyph: "●", label: "LIVE NOW", color: chalk.red, border: "red" },
  TIMED: { glyph: "○", label: "UPCOMING", color: chalk.yellow, border: "yellow" },
  SCHEDULED: { glyph: "○", label: "UPCOMING", color: chalk.yellow, border: "yellow" },
  FINISHED: { glyph: "✓", label: "FINISHED", color: chalk.green, border: "green" },
};

const DEFAULT_STYLE = { glyph: "•", label: "UNKNOWN", color: chalk.gray, border: "gray" };

// Returns a consistent style object for a given status.
const formatStatus = (status) => {
  const style = STATUS_STYLES[status] || {
    ...DEFAULT_STYLE,
    label: status || DEFAULT_STYLE.label,
  };

  return {
    badge: style.color.bold(`${style.glyph} ${style.label}`),
    border: style.border,
    color: style.color,
  };
};

module.exports = {
  formatStatus,
};
