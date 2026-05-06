# Conventions for Copilot agents working in this repo

## Stack & runtime
- **Language:** JavaScript (ES modules), Node 20+.
- **Framework:** Express 4 for HTTP.
- **Tests:** Node's built-in `node --test`. Do not add Jest, Mocha, or Vitest.
- **Frontend:** vanilla HTML/CSS/JS served from `public/`. Do not introduce a
  build step (no bundlers, no React, no TypeScript) without an explicit ask.

## Code style
- ES modules with named exports. Prefer `function` declarations for top-level
  helpers; arrow functions for inline callbacks.
- 2-space indentation. Semicolons. Double quotes for strings.
- No new top-level dependencies unless the issue explicitly requires one.

## Validation & errors
- Input validation lives in route handlers, before any side effect.
- Validation failures return `400` with `{ "error": "<message>" }`.
- Use built-in `URL`, regex, or small, dependency-free helpers — avoid adding
  validator libraries unless the issue calls for one.

## Tests
- Every behavior change is accompanied by a test in `test/`.
- Use the existing `startTestServer()` helper pattern from `test/users.test.js`.
- New test files should follow the `*.test.js` convention.

## Configuration
- All runtime config flows through `src/config.js`. Do not read `config.json`
  directly from any other file.
- If config format changes (e.g., JSON → YAML), update `src/config.js` so the
  rest of the app keeps using `loadConfig()` / `getLimits()` / etc. unchanged.

## Pull requests
- One issue per PR.
- PR description should include a brief summary, a "What changed" list, and a
  "How I tested" section showing `npm test` output.
- Keep diffs minimal — do not reformat unrelated files.

## Out of scope (do not change without an issue)
- Authentication / sessions.
- Database / persistence (the in-memory `users` array is intentional for demos).
- Production hardening (HTTPS, helmet, CORS, rate limiting).
