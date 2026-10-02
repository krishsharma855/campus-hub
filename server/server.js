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

app.get("/api/clubs/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM clubs WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Club not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to fetch club"
        });
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

app.get("/api/clubs", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM clubs");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch clubs" });
    }
});

app.get("/api/announcements", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM announcements");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
});

app.get("/api/announcements/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM announcements WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Announcement not found"
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to fetch announcement"
        });
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

app.post("/api/events/:id/register", async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        const eventResult = await pool.query(
            "SELECT * FROM events WHERE id = $1",
            [id]
        );

        if (eventResult.rows.length === 0) {
            return res.status(404).json({
                error: "Event not found"
            });
        }

        const userResult = await pool.query(
            "SELECT * FROM users WHERE id = $1",
            [user_id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        try {
            const registrationResult = await pool.query(
                `INSERT INTO event_registrations (user_id, event_id)
                 VALUES ($1, $2)
                 RETURNING *`,
                [user_id, id]
            );

            res.status(201).json(registrationResult.rows[0]);
        } catch (error) {
            if (error.code === "23505") {
                return res.status(409).json({
                    error: "User is already registered for this event"
                });
            }

            throw error;
        }
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to register for event"
        });
    }
});

app.delete("/api/events/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            "DELETE FROM events WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Event not found"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Failed to delete event"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});