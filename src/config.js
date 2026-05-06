import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

let cached = null;

export function loadConfig() {
  if (cached) return cached;
  const path = join(__dirname, "..", "config.json");
  const raw = readFileSync(path, "utf8");
  cached = JSON.parse(raw);
  return cached;
}

export function getServicePort() {
  return loadConfig().service.port;
}

export function getLogLevel() {
  return loadConfig().service.logLevel;
}

export function getLimits() {
  return loadConfig().limits;
}

export function isFeatureEnabled(name) {
  const cfg = loadConfig();
  return Boolean(cfg.features?.[name]);
}
