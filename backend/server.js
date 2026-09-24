const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const opportunitiesRoutes = require("./routes/opportunities");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/opportunities", opportunitiesRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "UniReach backend is running!"
    });
});

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "PostgreSQL connection successful!",
            databaseTime: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error.message);

        res.status(500).json({
            message: "Database connection failed.",
            error: error.message
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`UniReach backend running on http://localhost:${PORT}`);
});