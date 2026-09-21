const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5001;

app.use(cors());

app.get("/", (req, res) => {
    res.send("Campus Hub Backend is running 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});