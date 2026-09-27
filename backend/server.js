
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
// VISIBLE BACKEND DASHBOARD
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
            box-shadow:
                0 2px 8px rgba(0,0,0,0.08);
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

        form {
            margin-top: 20px;
        }

        label {
            display: block;
            margin-top: 15px;
            margin-bottom: 6px;
            font-weight: bold;
        }

        input,
        textarea {
            width: 100%;
            padding: 11px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 15px;
        }

        textarea {
            min-height: 100px;
            resize: vertical;
        }

        button {
            margin-top: 20px;
            padding: 12px 20px;
            border: none;
            border-radius: 6px;
            background: #111827;
            color: white;
            font-size: 15px;
            cursor: pointer;
        }

        button:hover {
            background: #374151;
        }

        .update-button {
            background: #d97706;
        }

        .update-button:hover {
            background: #b45309;
        }

        pre {
            background: #111827;
            color: #e5e7eb;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin-top: 20px;
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


    <!-- HEADER -->

    <div class="header">

        <h1>
            🚀 UniReach Backend
        </h1>

        <p>
            Opportunity Management API
        </p>

    </div>


    <!-- STATUS -->

    <div class="status">

        🟢 Backend Server is Running

    </div>


    <!-- API ENDPOINTS -->

    <div class="card">

        <h2>
            API Endpoints
        </h2>


        <div class="endpoint">

            <span class="method get">
                GET
            </span>

            <a href="/api/opportunities">
                /api/opportunities
            </a>

            <p>
                Get all opportunities.
            </p>

        </div>


        <div class="endpoint">

            <span class="method get">
                GET
            </span>

            <a href="/api/opportunities/1">
                /api/opportunities/:id
            </a>

            <p>
                Get one opportunity.
            </p>

        </div>


        <div class="endpoint">

            <span class="method post">
                POST
            </span>

            /api/opportunities

            <p>
                Create a new opportunity.
            </p>

        </div>


        <div class="endpoint">

            <span class="method put">
                PUT
            </span>

            /api/opportunities/:id

            <p>
                Update an opportunity.
            </p>

        </div>


        <div class="endpoint">

            <span class="method delete">
                DELETE
            </span>

            /api/opportunities/:id

            <p>
                Delete an opportunity.
            </p>

        </div>


        <hr>


        <h3>
            Saved Opportunities
        </h3>


        <div class="endpoint">

            <span class="method post">
                POST
            </span>

            /api/saved-opportunities

            <p>
                Save an opportunity for a user.
            </p>

        </div>


        <div class="endpoint">

            <span class="method get">
                GET
            </span>

            /api/saved-opportunities/:userId

            <p>
                Get a user's saved opportunities.
            </p>

        </div>


        <div class="endpoint">

            <span class="method delete">
                DELETE
            </span>

            /api/saved-opportunities/:userId/:opportunityId

            <p>
                Remove a saved opportunity.
            </p>

        </div>

    </div>


    <!-- CREATE -->

    <div class="card">

        <h2>
            ➕ Create New Opportunity
        </h2>

        <p>
            Use this form to test POST.
        </p>


        <form id="createForm">

            <label>
                Organization ID
            </label>

            <input
                type="number"
                id="createOrganizationId"
                value="1"
                required
            >


            <label>
                Opportunity Title
            </label>

            <input
                type="text"
                id="createTitle"
                placeholder="Example: Electrical Engineering Internship"
                required
            >


            <label>
                Description
            </label>

            <textarea
                id="createDescription"
                placeholder="Enter description"
                required
            ></textarea>


            <label>
                Opportunity Type
            </label>

            <input
                type="text"
                id="createType"
                placeholder="Example: Internship"
                required
            >


            <label>
                Location
            </label>

            <input
                type="text"
                id="createLocation"
                placeholder="Example: Accra, Ghana"
            >


            <label>
                Application URL
            </label>

            <input
                type="url"
                id="createUrl"
                placeholder="https://example.com/apply"
            >


            <label>
                Deadline
            </label>

            <input
                type="datetime-local"
                id="createDeadline"
            >


            <button type="submit">
                Create Opportunity
            </button>

        </form>


        <pre id="createResult">
Waiting for submission...
        </pre>

    </div>


    <!-- UPDATE -->

    <div class="card">

        <h2>
            ✏️ Update Opportunity
        </h2>

        <p>
            Enter the opportunity ID and the new information.
        </p>


        <form id="updateForm">

            <label>
                Opportunity ID
            </label>

            <input
                type="number"
                id="updateId"
                placeholder="Example: 1"
                required
            >


            <label>
                Organization ID
            </label>

            <input
                type="number"
                id="updateOrganizationId"
                value="1"
                required
            >


            <label>
                Opportunity Title
            </label>

            <input
                type="text"
                id="updateTitle"
                placeholder="Updated title"
                required
            >


            <label>
                Description
            </label>

            <textarea
                id="updateDescription"
                placeholder="Updated description"
                required
            ></textarea>


            <label>
                Opportunity Type
            </label>

            <input
                type="text"
                id="updateType"
                placeholder="Example: Internship"
                required
            >


            <label>
                Location
            </label>

            <input
                type="text"
                id="updateLocation"
                placeholder="Example: Accra, Ghana"
            >


            <label>
                Application URL
            </label>

            <input
                type="url"
                id="updateUrl"
                placeholder="https://example.com/apply"
            >


            <label>
                Deadline
            </label>

            <input
                type="datetime-local"
                id="updateDeadline"
            >


            <button
                type="submit"
                class="update-button"
            >
                Update Opportunity
            </button>

        </form>


        <pre id="updateResult">
Waiting for update...
        </pre>

    </div>


    <!-- DATABASE -->

    <div class="card">

        <h2>
            🗄️ Database
        </h2>


        <div class="database">

            <strong>
                PostgreSQL
            </strong>

            <p>
                Database:
                <strong>
                    unireach_db
                </strong>
            </p>

            <p>
                Host:
                <strong>
                    localhost
                </strong>
            </p>

            <p>
                Port:
                <strong>
                    5432
                </strong>
            </p>

        </div>

    </div>


    <!-- FRONTEND -->

    <div class="card">

        <h2>
            🌐 Frontend
        </h2>

        <a href="http://localhost:5173">
            http://localhost:5173
        </a>

    </div>


</div>


<script>


// =====================================================
// CREATE OPPORTUNITY
// =====================================================

document
    .getElementById("createForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const data = {

            organization_id:
                Number(
                    document
                        .getElementById("createOrganizationId")
                        .value
                ),

            title:
                document
                    .getElementById("createTitle")
                    .value,

            description:
                document
                    .getElementById("createDescription")
                    .value,

            opportunity_type:
                document
                    .getElementById("createType")
                    .value,

            location:
                document
                    .getElementById("createLocation")
                    .value,

            application_url:
                document
                    .getElementById("createUrl")
                    .value,

            deadline:
                document
                    .getElementById("createDeadline")
                    .value
        };

        const resultBox =
            document.getElementById("createResult");

        resultBox.textContent =
            "Creating opportunity...";

        try {

            const response =
                await fetch("/api/opportunities", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(data)

                });

            const result =
                await response.json();

            resultBox.textContent =
                JSON.stringify(result, null, 2);

        } catch (error) {

            resultBox.textContent =
                "Error: " + error.message;

        }

    });



// =====================================================
// UPDATE OPPORTUNITY
// =====================================================

document
    .getElementById("updateForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const id =
            document
                .getElementById("updateId")
                .value;

        const data = {

            organization_id:
                Number(
                    document
                        .getElementById("updateOrganizationId")
                        .value
                ),

            title:
                document
                    .getElementById("updateTitle")
                    .value,

            description:
                document
                    .getElementById("updateDescription")
                    .value,

            opportunity_type:
                document
                    .getElementById("updateType")
                    .value,

            location:
                document
                    .getElementById("updateLocation")
                    .value,

            application_url:
                document
                    .getElementById("updateUrl")
                    .value,

            deadline:
                document
                    .getElementById("updateDeadline")
                    .value
        };

        const resultBox =
            document.getElementById("updateResult");

        resultBox.textContent =
            "Updating opportunity...";

        try {

            const response =
                await fetch(
                    "/api/opportunities/" + id,
                    {

                        method: "PUT",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(data)

                    }
                );

            const result =
                await response.json();

            resultBox.textContent =
                JSON.stringify(result, null, 2);

        } catch (error) {

            resultBox.textContent =
                "Error: " + error.message;

        }

    });

</script>


</body>

</html>

    `);

});


// =====================================================
// DATABASE TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {

    try {

        const result =
            await pool.query("SELECT NOW()");

        res.json({

            message:
                "PostgreSQL connection successful!",

            databaseTime:
                result.rows[0].now

        });

    } catch (error) {

        console.error(
            "Database connection error:",
            error.message
        );

        res.status(500).json({

            message:
                "Database connection failed.",

            error:
                error.message

        });

    }

});


// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log( `UniReach backend running on http://localhost:${PORT}` ); });