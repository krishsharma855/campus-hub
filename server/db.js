const { Pool } = require("pg");

const pool = new Pool({
    user: "krishsharna",
    host: "localhost",
    database: "campus_hub",
    port: 5432
});

module.exports = pool;