const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const opportunitiesRoutes = require("./routes/opportunities");
const savedOpportunitiesRoutes = require("./routes/savedOpportunities");
const remindersRoutes = require("./routes/reminders");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());


// =====================================================
// API ROUTES
// =====================================================

app.use("/api/opportunities", opportunitiesRoutes);

app.use(
    "/api/saved-opportunities",
    savedOpportunitiesRoutes
);

app.use("/api/reminders", remindersRoutes);


// =====================================================
// BACKEND HOME
// =====================================================

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>UniReach Backend</title>

            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    font-family: Arial, sans-serif;
                    background: #f3f4f6;
                    margin: 0;
                    padding: 40px 20px;
                    color: #111827;
                }

                .container {
                    max-width: 1000px;
                    margin: auto;
                }

                .header {
                    background: #111827;
                    color: white;
                    padding: 30px;
                    border-radius: 12px;
                    margin-bottom: 25px;
                }

                .header h1 {
                    margin: 0 0 10px;
                }

                .header p {
                    margin: 0;
                    color: #d1d5db;
                }

                .status {
                    background: #dcfce7;
                    color: #166534;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 25px;
                    font-weight: bold;
                }

                .card {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    margin-bottom: 25px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }

                .card h2 {
                    margin-top: 0;
                }

                .endpoint {
                    border: 1px solid #e5e7eb;
                    padding: 18px;
                    border-radius: 8px;
                    margin-bottom: 12px;
                }

                .method {
                    display: inline-block;
                    font-weight: bold;
                    padding: 5px 10px;
                    border-radius: 5px;
                    margin-right: 8px;
                }

                .get {
                    background: #dbeafe;
                    color: #1d4ed8;
                }

                .post {
                    background: #dcfce7;
                    color: #15803d;
                }

                .put {
                    background: #fef3c7;
                    color: #b45309;
                }

                .delete {
                    background: #fee2e2;
                    color: #b91c1c;
                }

                a {
                    color: #2563eb;
                    text-decoration: none;
                }

                a:hover {
                    text-decoration: underline;
                }

                .database {
                    background: #eff6ff;
                    border-left: 4px solid #2563eb;
                    padding: 15px;
                    border-radius: 6px;
                }
            </style>
        </head>

        <body>

            <div class="container">

                <div class="header">
                    <h1>🚀 UniReach Backend</h1>
                    <p>Opportunity Management API</p>
                </div>

                <div class="status">
                    🟢 Backend Server is Running
                </div>

                <div class="card">

                    <h2>API Endpoints</h2>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        /api/opportunities
                        <p>Get all opportunities.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        /api/opportunities/:id
                        <p>Get one opportunity.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method post">POST</span>
                        /api/opportunities
                        <p>Create a new opportunity.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method put">PUT</span>
                        /api/opportunities/:id
                        <p>Update an opportunity.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method delete">DELETE</span>
                        /api/opportunities/:id
                        <p>Delete an opportunity.</p>
                    </div>

                    <hr>

                    <h3>Saved Opportunities</h3>

                    <div class="endpoint">
                        <span class="method post">POST</span>
                        /api/saved-opportunities
                        <p>Save an opportunity.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        /api/saved-opportunities/:userId
                        <p>Get a user's saved opportunities.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method delete">DELETE</span>
                        /api/saved-opportunities/:userId/:opportunityId
                        <p>Remove a saved opportunity.</p>
                    </div>

                    <hr>

                    <h3>Reminders</h3>

                    <div class="endpoint">
                        <span class="method get">GET</span>
                        /api/reminders/:userId
                        <p>Get a user's reminders.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method post">POST</span>
                        /api/reminders
                        <p>Create a reminder.</p>
                    </div>

                    <div class="endpoint">
                        <span class="method delete">DELETE</span>
                        /api/reminders/:reminderId
                        <p>Cancel a reminder.</p>
                    </div>

                </div>

                <div class="card">

                    <h2>🗄️ Database</h2>

                    <div class="database">
                        <strong>PostgreSQL</strong>

                        <p>
                            Database:
                            <strong>unireach_db</strong>
                        </p>

                        <p>
                            Host:
                            <strong>localhost</strong>
                        </p>

                        <p>
                            Port:
                            <strong>5432</strong>
                        </p>
                    </div>

                </div>

                <div class="card">

                    <h2>🌐 Frontend</h2>

                    <a href="http://localhost:5173">
                        http://localhost:5173
                    </a>

                </div>

            </div>

        </body>
        </html>
    `);
});


// =====================================================
// DATABASE TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {
    try {

        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "PostgreSQL connection successful!",
            databaseTime: result.rows[0].now
        });

    } catch (error) {

        console.error(
            "Database connection error:",
            error.message
        );

        res.status(500).json({
            success: false,
            message: "Database connection failed.",
            error: error.message
        });
    }
});


// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `UniReach backend running on http://localhost:${PORT}`
    );
});