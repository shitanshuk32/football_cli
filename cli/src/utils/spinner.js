const chalk = require("chalk");

// Braille frames give a smooth, lightweight spinner without extra deps.
const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const INTERVAL_MS = 80;

// A tiny terminal spinner. The Footy backend runs on a free Render instance
// that spins down when idle, so the first request can sit for many seconds
// while it wakes up. The spinner reassures the user that footy is working.
const createSpinner = (text) => {
  const isTTY = Boolean(process.stdout.isTTY);
  let index = 0;
  let interval = null;

  const render = () => {
    const frame = FRAMES[index];
    index = (index + 1) % FRAMES.length;
    process.stdout.write(`\r${chalk.cyan(frame)} ${text}`);
  };

  return {
    start() {
      // Without a TTY (piped output, CI) an animation is just noise, so we
      // print the message once and move on.
      if (!isTTY) {
        console.log(chalk.dim(`⚽ ${text}`));
        return this;
      }

      process.stdout.write("\x1B[?25l"); // hide the cursor
      render();
      interval = setInterval(render, INTERVAL_MS);
      return this;
    },
    stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      if (isTTY) {
        process.stdout.write("\r\x1B[K"); // clear the spinner line
        process.stdout.write("\x1B[?25h"); // restore the cursor
      }
    },
  };
};

module.exports = {
  createSpinner,
};
