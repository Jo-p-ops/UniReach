const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET reminders for a specific user
router.get("/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID.",
            });
        }

        const result = await pool.query(
            `
            SELECT
                r.id,
                r.user_id,
                r.opportunity_id,
                r.remind_at,
                r.is_sent,
                r.created_at,
                o.title,
                o.description,
                o.opportunity_type,
                o.location,
                o.application_url,
                o.deadline,
                org.name AS organization
            FROM reminders r
            INNER JOIN opportunities o
                ON r.opportunity_id = o.id
            INNER JOIN organizations org
                ON o.organization_id = org.id
            WHERE r.user_id = $1
            ORDER BY o.deadline ASC
            `,
            [userId]
        );

        res.json({
            success: true,
            reminders: result.rows,
        });
    } catch (error) {
        console.error("Error fetching reminders:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch reminders.",
        });
    }
});

module.exports = router;