import { Router } from "express";
import { getLimits } from "../config.js";

export const usersRouter = Router();

// In-memory store for demo purposes.
const users = [];

usersRouter.get("/", (_req, res) => {
  res.json({ users });
});

// NOTE: This endpoint deliberately has weak input validation.
// The "Coding Agent" demo (Issue #1) hardens it.
usersRouter.post("/", (req, res) => {
  const { username, email } = req.body ?? {};

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  const limits = getLimits();
  if (username.length > limits.maxUsernameLength) {
    return res.status(400).json({ error: "username too long" });
  }

  const user = { id: users.length + 1, username, email };
  users.push(user);
  res.status(201).json(user);
});
