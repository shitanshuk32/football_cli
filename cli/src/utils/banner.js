const figlet = require("figlet");
const boxen = require("boxen");
const chalk = require("chalk");
const gradient = require("gradient-string");
const { version } = require("../../package.json");

// Pitch-inspired teal -> green gradient for the wordmark.
const pitch = gradient(["#11998e", "#38ef7d"]);

// Startup splash banner. Intentionally shown ONLY on `footy help`,
// not on every command, so day-to-day output stays clean.
const printBanner = () => {
  const art = figlet.textSync("FOOTY", { font: "ANSI Shadow" });

  const content = [
    pitch.multiline(art.trimEnd()),
    "",
    `${chalk.dim("⚽ FIFA World Cup Terminal Companion")}   ${chalk.green.bold(
      `v${version}`,
    )}`,
  ].join("\n");

  console.log(
    boxen(content, {
      padding: { top: 1, bottom: 1, left: 2, right: 2 },
      margin: { top: 1, bottom: 0, left: 0, right: 0 },
      borderStyle: "round",
      borderColor: "green",
    }),
  );
};

module.exports = {
  printBanner,
};
