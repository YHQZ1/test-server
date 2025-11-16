require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const app = express();

app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "DB query failed" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from your first EC2 backend!");
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "running",
    message: "Your backend is working fine!",
    uptime: process.uptime(),
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
