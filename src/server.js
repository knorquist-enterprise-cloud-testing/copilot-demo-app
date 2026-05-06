import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { getServicePort, getLogLevel, isFeatureEnabled } from "./config.js";
import { usersRouter } from "./routes/users.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(express.static(join(__dirname, "..", "public")));

  app.get("/api/info", (_req, res) => {
    res.json({
      name: "copilot-demo-app",
      logLevel: getLogLevel(),
      registrationEnabled: isFeatureEnabled("userRegistration"),
    });
  });

  app.get("/api/healthz", (_req, res) => {
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/users", usersRouter);

  return app;
}

// Only start the server when invoked directly, not when imported by tests.
const isMain = process.argv[1] && process.argv[1].endsWith("server.js");
if (isMain) {
  const port = getServicePort();
  createApp().listen(port, () => {
    console.log(`copilot-demo-app listening on :${port}`);
  });
}
