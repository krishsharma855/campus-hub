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

app.get("/api/clubs", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM clubs");
        res.json(result.rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Failed to fetch clubs" });
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