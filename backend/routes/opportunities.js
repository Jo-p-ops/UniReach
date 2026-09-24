const express = require("express");
const router = express.Router();

const pool = require("../db");

// Get all opportunities
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                op.id,
                op.title,
                op.description,
                op.opportunity_type,
                op.location,
                op.application_url,
                op.deadline,
                o.name AS organization
            FROM opportunities op
            JOIN organizations o
                ON op.organization_id = o.id
            ORDER BY op.created_at DESC
        `);

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching opportunities:", error.message);

        res.status(500).json({
            message: "Failed to fetch opportunities."
        });
    }
});


// Get one opportunity by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
            SELECT
                op.id,
                op.title,
                op.description,
                op.opportunity_type,
                op.location,
                op.application_url,
                op.deadline,
                o.name AS organization
            FROM opportunities op
            JOIN organizations o
                ON op.organization_id = o.id
            WHERE op.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Opportunity not found."
            });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching opportunity:", error.message);

        res.status(500).json({
            message: "Failed to fetch opportunity."
        });
    }
});


module.exports = router;