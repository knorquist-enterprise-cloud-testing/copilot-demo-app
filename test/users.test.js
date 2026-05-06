import { test } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../src/server.js";

async function startTestServer() {
  const app = createApp();
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      resolve({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise((res) => server.close(res)),
      });
    });
  });
}

test("GET /api/info returns service metadata", async () => {
  const s = await startTestServer();
  try {
    const r = await fetch(`${s.url}/api/info`);
    assert.equal(r.status, 200);
    const body = await r.json();
    assert.equal(body.name, "copilot-demo-app");
    assert.equal(typeof body.registrationEnabled, "boolean");
  } finally {
    await s.close();
  }
});

test("POST /api/users rejects missing fields", async () => {
  const s = await startTestServer();
  try {
    const r = await fetch(`${s.url}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alice" }),
    });
    assert.equal(r.status, 400);
  } finally {
    await s.close();
  }
});

test("POST /api/users creates a user with valid fields", async () => {
  const s = await startTestServer();
  try {
    const r = await fetch(`${s.url}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "alice", email: "alice@example.com" }),
    });
    assert.equal(r.status, 201);
    const body = await r.json();
    assert.equal(body.username, "alice");
    assert.equal(body.email, "alice@example.com");
  } finally {
    await s.close();
  }
});
