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
app.get("/api/events/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM events WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Event not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to fetch event"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
