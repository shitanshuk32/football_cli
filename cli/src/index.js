const chalk = require("chalk");
const { showUpcomingMatches } = require("./commands/upcoming.command");
const { showAllMatches } = require("./commands/matches.command");
const { showTeamMatches } = require("./commands/team.command");
const { showLiveMatches } = require("./commands/live.command");
const { showTodayMatches } = require("./commands/today.command");
const { printError, printUnknownCommand } = require("./utils/messages");
const { printBanner } = require("./utils/banner");

const printHelp = () => {
  const cmd = (icon, name, desc) =>
    `  ${icon}  ${chalk.cyan(name.padEnd(18))}${chalk.dim(desc)}`;

  printBanner();
  console.log("");
  console.log(chalk.bold.white("  AVAILABLE COMMANDS"));
  console.log(chalk.gray("  ──────────────────"));
  console.log("");
  console.log(cmd("📅", "footy today", "Show today's matches"));
  console.log(cmd("🔴", "footy live", "Show live matches"));
  console.log(cmd("⏳", "footy upcoming", "Show upcoming matches"));
  console.log(cmd("📋", "footy matches", "Show all matches"));
  console.log(cmd("🚩", "footy team <team>", "Show matches for a team"));
  console.log(cmd("❓", "footy help", "Show this help menu"));
  console.log("");
  console.log(chalk.dim("  Tip: start with ") + chalk.green("footy today"));
  console.log("");
};

const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    printHelp();
    return;
  }

  const command = args[0];
  const teamName = args[1];

  if (command === "help") {
    printHelp();
    return;
  }

  if (command === "upcoming") {
    await showUpcomingMatches();
    return;
  }

  if (command === "matches") {
    await showAllMatches();
    return;
  }

  if (command === "live") {
    await showLiveMatches();
    return;
  }

  if (command === "today") {
    await showTodayMatches();
    return;
  }

  if (command === "team") {
    if (!teamName) {
      printError("Please provide a team name. Example: footy team Brazil");
      return;
    }

    await showTeamMatches(teamName);
    return;
  }

  printUnknownCommand(command);
};

main();
