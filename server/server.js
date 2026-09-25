const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

const PORT = 5001;

app.use(cors());
app.use(express.json());

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
app.post("/api/events", async (req, res) => {
    try {
        const { title, description, date, location, club_id } = req.body;

        if (!title || !date) {
            return res.status(400).json({
                error: "Title and date are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO events (title, description, date, location, club_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [title, description, date, location, club_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to create event"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});