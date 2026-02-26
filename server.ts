import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("toolsathi.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS tool_usage (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tool_id TEXT UNIQUE,
    usage_count INTEGER DEFAULT 0
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/usage", (req, res) => {
    const rows = db.prepare("SELECT * FROM tool_usage").all();
    res.json(rows);
  });

  app.post("/api/usage/:toolId", (req, res) => {
    const { toolId } = req.params;
    const stmt = db.prepare(`
      INSERT INTO tool_usage (tool_id, usage_count)
      VALUES (?, 1)
      ON CONFLICT(tool_id) DO UPDATE SET usage_count = usage_count + 1
    `);
    stmt.run(toolId);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
