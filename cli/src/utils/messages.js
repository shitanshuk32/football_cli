const chalk = require("chalk");

// Consistent, intentional empty state (e.g. "No matches found for Brazil.").
const printEmpty = (message) => {
  console.log("");
  console.log(chalk.yellow(`⚽ ${message}`));
  console.log("");
};

// Consistent error state used by every command's catch block.
const printError = (message) => {
  console.log("");
  console.log(chalk.red(`✖ ${message}`));
  console.log("");
};

// Friendly "unknown command" guidance.
const printUnknownCommand = (command) => {
  console.log("");
  console.log(chalk.red(`✖ Unknown command: ${command}`));
  console.log("");
  console.log(chalk.dim("Try:"));
  console.log("  footy help");
  console.log("");
};

module.exports = {
  printEmpty,
  printError,
  printUnknownCommand,
};
