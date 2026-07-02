const boxen = require("boxen");
const chalk = require("chalk");
const { teamBadge } = require("./teamBadge");
const { formatStatus } = require("./statusFormat");
const { formatKickoff, relativeToNow } = require("./formatDate");

// Every card is rendered at a fixed width so the whole screen lines up.
// BOX_WIDTH is the total width (borders included); CARD_WIDTH is the usable
// inner content width (box width minus the 2 borders and 2+2 horizontal padding).
const BOX_WIDTH = 46;
const CARD_WIDTH = BOX_WIDTH - 2 - 4;

// Badges are a fixed 5 visible columns (" XXX ") followed by a 2-space gutter,
// so team names — and the "vs" separator — always line up in a column,
// regardless of the team name's length.
const NAME_OFFSET = 7;

// WON / LOST / DRAW result tags. Deliberately styled differently from the
// filled team-code badges: colored bold text with a directional glyph, so a
// result reads as a status rather than looking like another code badge.
const RESULT_TAGS = {
  WON: { label: "▲ WON", paint: chalk.bold.green },
  LOST: { label: "▼ LOST", paint: chalk.dim.red },
  DRAW: { label: "= DRAW", paint: chalk.bold.gray },
};

// Visible width every tag is padded to, so the score column stays aligned.
const TAG_WIDTH = 6;

const resultTag = (result) => {
  const tag = RESULT_TAGS[result] || RESULT_TAGS.DRAW;
  return tag.paint(tag.label.padEnd(TAG_WIDTH));
};

// Compares a team's score against the opponent's for a finished match.
const resultFor = (mine, theirs) => {
  if (mine > theirs) return "WON";
  if (mine < theirs) return "LOST";
  return "DRAW";
};

// Builds a single team row, optionally with a right-aligned score and result tag.
// Alignment is computed from visible character counts (badge = 5 cols, gutter =
// 2 cols, result tag = 6 cols) so ANSI color codes never throw off the padding.
const buildTeamRow = (name, score, { showScore, result }) => {
  const label = `${teamBadge(name)}  ${chalk.bold.white(name)}`;
  if (!showScore) return label;

  const scoreStr = String(score);
  const scorePaint = result === "WON" ? chalk.bold.green : chalk.bold.white;
  const scoreColored = scorePaint(scoreStr);
  const usedLeft = NAME_OFFSET + name.length;

  // Finished match: show a WON/LOST/DRAW tag before the score.
  if (result) {
    const rightVisible = TAG_WIDTH + 2 + scoreStr.length;
    const pad = Math.max(1, CARD_WIDTH - usedLeft - rightVisible);
    return `${label}${" ".repeat(pad)}${resultTag(result)}  ${scoreColored}`;
  }

  // In-play match: score only, right-aligned.
  const pad = Math.max(1, CARD_WIDTH - usedLeft - scoreStr.length);
  return `${label}${" ".repeat(pad)}${scoreColored}`;
};

// Builds a broadcast-style scoreboard card with a consistent grammar:
//
//    MEX   Mexico                       2
//          vs
//    ECU   Ecuador                      1
//   ────────────────────────────────────
//    ✓ FINISHED
//    Jul 1, 2026, 6:30 AM IST
//
const buildMatchCard = (match) => {
  const status = formatStatus(match.status);

  const score = match.score || {};
  const hasScore = score.home !== null && score.home !== undefined &&
    score.away !== null && score.away !== undefined;
  const isFinished = match.status === "FINISHED";
  const showResults = hasScore && isFinished;

  const home = buildTeamRow(match.homeTeam, score.home, {
    showScore: hasScore,
    result: showResults ? resultFor(score.home, score.away) : undefined,
  });
  const away = buildTeamRow(match.awayTeam, score.away, {
    showScore: hasScore,
    result: showResults ? resultFor(score.away, score.home) : undefined,
  });
  const vs = `${" ".repeat(NAME_OFFSET)}${chalk.dim.italic("vs")}`;

  const divider = chalk.dim("─".repeat(CARD_WIDTH));

  const kickoff = `${formatKickoff(match.kickoff)} IST`;
  const countdown = relativeToNow(match.kickoff);
  const kickoffLine = countdown
    ? chalk.dim(`${kickoff}  ·  `) + status.color(countdown)
    : chalk.dim(kickoff);

  const content = [
    home,
    vs,
    away,
    divider,
    status.badge,
    kickoffLine,
  ].join("\n");

  return boxen(content, {
    width: BOX_WIDTH,
    padding: { top: 1, bottom: 1, left: 2, right: 2 },
    margin: { top: 0, bottom: 1, left: 0, right: 0 },
    borderStyle: "round",
    borderColor: status.border,
  });
};

module.exports = {
  buildMatchCard,
};
