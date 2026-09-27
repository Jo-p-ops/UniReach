const express = require("express");
const router = express.Router();

const pool = require("../db");

/*
|--------------------------------------------------------------------------
| SAVE AN OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {
    try {
        const { user_id, opportunity_id } = req.body;

        if (!user_id || !opportunity_id) {
            return res.status(400).json({
                success: false,
                message: "user_id and opportunity_id are required."
            });
        }

        const result = await pool.query(
            `
            INSERT INTO saved_opportunities (
                user_id,
                opportunity_id
            )
            VALUES ($1, $2)
            ON CONFLICT (user_id, opportunity_id)
            DO NOTHING
            RETURNING *
            `,
            [user_id, opportunity_id]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "Opportunity is already saved."
            });
        }

        res.status(201).json({
            success: true,
            message: "Opportunity saved successfully.",
            savedOpportunity: result.rows[0]
        });
    } catch (error) {
        console.error("POST /saved-opportunities error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save opportunity."
        });
    }
});


/*
|--------------------------------------------------------------------------
| GET SAVED OPPORTUNITIES FOR A USER
|--------------------------------------------------------------------------
*/
router.get("/:userId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);

        if (!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID."
            });
        }

        const result = await pool.query(
            `
            SELECT
                so.id AS saved_id,
                so.saved_at,
                op.id,
                op.title,
                op.description,
                op.opportunity_type,
                op.location,
                op.application_url,
                op.deadline,
                o.name AS organization
            FROM saved_opportunities so
            INNER JOIN opportunities op
                ON so.opportunity_id = op.id
            INNER JOIN organizations o
                ON op.organization_id = o.id
            WHERE so.user_id = $1
            ORDER BY so.saved_at DESC
            `,
            [userId]
        );

        res.status(200).json({
            success: true,
            opportunities: result.rows
        });
    } catch (error) {
        console.error("GET /saved-opportunities error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch saved opportunities."
        });
    }
});


/*
|--------------------------------------------------------------------------
| REMOVE A SAVED OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.delete("/:userId/:opportunityId", async (req, res) => {
    try {
        const userId = Number(req.params.userId);
        const opportunityId = Number(req.params.opportunityId);

        if (
            !Number.isInteger(userId) ||
            userId <= 0 ||
            !Number.isInteger(opportunityId) ||
            opportunityId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID or opportunity ID."
            });
        }

        const result = await pool.query(
            `
            DELETE FROM saved_opportunities
            WHERE user_id = $1
            AND opportunity_id = $2
            RETURNING *
            `,
            [userId, opportunityId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Saved opportunity not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Opportunity removed from saved opportunities."
        });
    } catch (error) {
        console.error(
            "DELETE /saved-opportunities error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to remove saved opportunity."
        });
    }
});


module.exports = router;