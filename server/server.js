const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Campus Hub Backend is running 🚀");
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Campus Hub API is running"
    });
});
app.get("/api/events", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM events");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
