# copilot-demo-app

A tiny full-stack app sized for demonstrating the three agentic surfaces of
**GitHub Copilot**:

| Surface | Demo this repo supports | Driving issue |
|---|---|---|
| **Coding Agent (cloud)** | Add input validation to `POST /api/users` and back it with tests | Issue #1 |
| **Copilot CLI** | Migrate `config.json` to YAML across the repo (multi-file refactor) | Issue #2 |
| **IDE Agent Mode** | Add a `/api/healthz` endpoint and wire it into the frontend status badge | Issue #3 |

## Stack

- Node 20+, ES modules
- Express for the API
- Vanilla HTML/JS frontend served from `public/`
- `node --test` for tests (no extra runner)

## Run it

```bash
npm install
npm test
npm start
# open http://localhost:3000
```

## Layout

```
src/
  server.js        # creates and starts the Express app
  config.js        # loads config.json, exposes typed helpers
  routes/users.js  # POST /api/users — INPUT VALIDATION IS WEAK BY DESIGN (see Issue #1)
public/
  index.html       # contains a placeholder status badge (Issue #3)
  app.js           # frontend; polls /api/users; status badge TODO (Issue #3)
  styles.css
test/
  users.test.js    # baseline tests; the Coding Agent should add to these
config.json        # service config — to be migrated to YAML (Issue #2)
```

## Conventions

See [`AGENTS.md`](./AGENTS.md) for repo conventions Copilot agents will pick
up automatically.

## Demo notes for the presenter

Each demo intentionally leaves its target broken or missing:

- The `POST /api/users` endpoint accepts any non-empty string as an email.
- The frontend status badge says `status: unknown` and never updates.
- `config.json` is read from three places — a refactor target with surface area.

That's the point — the agent gets to do real work in front of the audience.
