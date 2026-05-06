# Copilot instructions

This repo follows the conventions documented in [`AGENTS.md`](../AGENTS.md).

When suggesting code:
- Keep the dependency footprint small; prefer the standard library.
- Match the existing style of nearby files.
- When you change behavior, update or add a test under `test/`.
- When you change config shape, update `src/config.js` so callers don't change.
