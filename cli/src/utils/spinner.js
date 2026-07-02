const chalk = require("chalk");

// Braille frames give a smooth, lightweight spinner without extra deps.
const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
// Trailing dots animate on their own rhythm: . -> .. -> ... -> . -> ...
const DOTS = [".", "..", "..."];
const INTERVAL_MS = 80;
const FRAMES_PER_DOT = 4; // advance the dots every ~320ms
const PAD = "   "; // left padding so the spinner isn't glued to the prompt

// A tiny terminal spinner. The Footy backend runs on a free Render instance
// that spins down when idle, so the first request can sit for many seconds
// while it wakes up. The spinner reassures the user that footy is working.
const createSpinner = (text) => {
  // Strip any trailing dots the caller passed so we can animate our own.
  const label = text.replace(/\.+$/, "");
  const isTTY = Boolean(process.stdout.isTTY);
  let tick = 0;
  let interval = null;

  const render = () => {
    const frame = FRAMES[tick % FRAMES.length];
    const dots = DOTS[Math.floor(tick / FRAMES_PER_DOT) % DOTS.length];
    tick += 1;
    // \x1B[K clears to end of line so shrinking dots leave no artifacts.
    process.stdout.write(
      `\r${PAD}${chalk.cyan(frame)}  ${label}${chalk.cyan(dots)}\x1B[K`,
    );
  };

  return {
    start() {
      // Without a TTY (piped output, CI) an animation is just noise, so we
      // print the message once and move on.
      if (!isTTY) {
        console.log(`\n${PAD}${chalk.dim(`⚽ ${label}...`)}`);
        return this;
      }

      console.log(""); // top padding above the spinner
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
