# footy-cli

A FIFA World Cup 2026 companion for the terminal.

Check today's matches, live games, upcoming fixtures, and a specific team's schedule without leaving your shell.

## Install

```bash
npm install -g footy-cli
```

## Usage

```bash
footy today              # matches kicking off today
footy live               # matches in play right now
footy upcoming           # scheduled matches that haven't started
footy matches            # all matches
footy team Portugal      # matches for one team
footy watch Brazil       # add a team to your watchlist
footy watchlist          # show the teams you're watching
footy unwatch Brazil     # remove a team from your watchlist
footy help               # show all commands
```

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

## Configuration

By default the CLI talks to the hosted Footy backend, so it works right after install.

If you're running the backend yourself, point the CLI at it with an environment variable:

```bash
FOOTY_API_URL=http://localhost:3000 footy today
```

## Links

- Source: https://github.com/shitanshuk32/football_cli
- Issues: https://github.com/shitanshuk32/football_cli/issues

## License

MIT
