# 🏆 Footy

[![npm version](https://img.shields.io/npm/v/footy-cli.svg)](https://www.npmjs.com/package/footy-cli)

A FIFA World Cup 2026 companion for the terminal.

Footy lets you check today's matches, live games, upcoming fixtures, and a specific team's schedule without leaving your shell. You run `footy today` or `footy team Portugal` and get clean, color-coded match cards right in the terminal.

I built it because I wanted something quick to glance at during the World Cup, and because it was a good excuse to practice building a small full-stack tool end to end — an Express API on one side, a CLI on the other.

<p align="center">
  <img src="docs/screenshots/footy_today_command.png" width="800" />
</p>

## Features

- Today's matches, sorted by kickoff time
- Live matches with a "LIVE NOW" banner
- Upcoming (scheduled) fixtures
- Search by team (`footy team Brazil`)
- A personal watchlist — `footy watch Brazil`, `footy watchlist`, `footy unwatch Brazil`
- Match cards that change color based on status (live / upcoming / finished)
- Country flags and World Cup branding
- Installable as a global `footy` command

## Architecture

```
CLI
 ↓
Backend (Express)
 ↓
Football API
```

The CLI never talks to the football data provider directly — it goes through my own backend.

I did this on purpose. The backend is where all the messy work happens: calling the third-party API, reshaping its verbose response into a flat `{ homeTeam, awayTeam, status, kickoff }` object, and filtering by status/team/date. The CLI just asks for data and draws it.

The other reasons: the API key stays on the server instead of being shipped inside a global CLI, and if I ever add another client (a web page, an editor extension) it can reuse the same endpoints. The tradeoff is that you run two processes instead of one, but for what it buys, that's fine.

## Screenshots

<p align="center">
  <img src="docs/screenshots/footy_command.png" width="45%" />
  <img src="docs/screenshots/footy_today_command.png" width="45%" />
</p>

<p align="center">
  <img src="docs/screenshots/footy_matches_command.png" width="45%" />
  <img src="docs/screenshots/footy_team_command.png" width="45%" />
</p>

*Help screen · today's matches · all matches · a single team's fixtures.*

## Commands

| Command | What it does |
| :--- | :--- |
| `footy` / `footy help` | Show the banner and command list |
| `footy today` | Matches kicking off today |
| `footy live` | Matches in play right now |
| `footy upcoming` | Scheduled matches that haven't started |
| `footy matches` | All matches |
| `footy team <name>` | Matches for one team, e.g. `footy team Portugal` |
| `footy watch <name>` | Add a team to your watchlist, e.g. `footy watch Brazil` |
| `footy watchlist` | Show the teams you're watching |
| `footy unwatch <name>` | Remove a team from your watchlist, e.g. `footy unwatch Brazil` |

## Project Structure

```
backend/   Express API — fetches, reshapes, and serves match data
cli/       The "footy" command — calls the backend and renders the UI
docs/      Screenshots used in this README
```

On the backend, requests flow through routes → controllers → services. The services hold all the data logic, so the controllers stay thin and the API surface (`/api/v1/matches`) stays small.

On the CLI side, each command lives in its own file, and the shared UI bits (cards, flags, status badges, header, theme) are pulled into `cli/src/utils` so everything renders consistently.

## Getting Started

You'll need Node.js (v18+) and a free API key from [football-data.org](https://www.football-data.org/).

Run the backend first, then link the CLI.

**Backend**

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=3000
FOOTBALL_API_KEY=your_key_here
```

Start it:

```bash
npm run dev
```

It runs on `http://localhost:3000` (there's a `/health` endpoint if you want to check).

**CLI**

In another terminal:

```bash
cd cli
npm install
npm link
```

`npm link` makes `footy` available globally. With the backend running, you can now use it from anywhere:

```bash
footy today
footy live
footy team Portugal
```

The CLI points at `http://localhost:3000`, so keep the backend running.

## Engineering Concepts

A few things this project touches on:

- A small versioned REST API (`/api/v1/matches`) with route/controller/service layering
- Centralized error handling (Express middleware + an `asyncHandler` wrapper)
- Normalizing a third-party API's response into a shape the client actually wants
- Building an installable CLI with command routing and a help screen
- Reusable terminal UI helpers (Chalk, Boxen, figlet) with consistent theming

## Ideas I'm Exploring

Nothing here is built yet — just things I'd like to try:

- Notifications around kickoff
- AI-generated match summaries
- A Cursor extension
- A caching layer to cut down on API calls
- Support for more tournaments

## About

This started as a way for me to learn backend development, CLI tooling, API design, and terminal UX while building something I'd actually use during the World Cup.

If you find it useful, a ⭐ is appreciated.
