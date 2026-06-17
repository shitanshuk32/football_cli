const chalk = require("chalk");

// Shared layout tokens so every screen lines up consistently.
const WIDTH = 42;

// Build a full-width divider line out of a single character.
const divider = (char) => char.repeat(WIDTH);

// Brand palette, kept in one place so colors stay consistent everywhere.
const brand = {
  title: chalk.yellow.bold,
  heading: chalk.cyan.bold,
  muted: chalk.gray,
  dim: chalk.dim,
};

module.exports = {
  WIDTH,
  divider,
  brand,
};
