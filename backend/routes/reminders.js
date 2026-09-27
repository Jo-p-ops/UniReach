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

// CREATE a reminder
router.post("/", async (req, res) => {
    try {
        const { user_id, opportunity_id, remind_at } = req.body;

        const userId = Number(user_id);
        const opportunityId = Number(opportunity_id);

        if (
            !Number.isInteger(userId) ||
            userId <= 0 ||
            !Number.isInteger(opportunityId) ||
            opportunityId <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID or opportunity ID.",
            });
        }

        if (!remind_at) {
            return res.status(400).json({
                success: false,
                message: "Reminder date and time are required.",
            });
        }

        const opportunityResult = await pool.query(
            `
            SELECT id, title, deadline
            FROM opportunities
            WHERE id = $1
            `,
            [opportunityId]
        );

        if (opportunityResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found.",
            });
        }

        const opportunity = opportunityResult.rows[0];

        const reminderDate = new Date(remind_at);

        if (Number.isNaN(reminderDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid reminder date and time.",
            });
        }

        if (
            opportunity.deadline &&
            reminderDate >= new Date(opportunity.deadline)
        ) {
            return res.status(400).json({
                success: false,
                message: "Reminder must be set before the opportunity deadline.",
            });
        }

        const result = await pool.query(
            `
            INSERT INTO reminders (
                user_id,
                opportunity_id,
                remind_at,
                is_sent
            )
            VALUES ($1, $2, $3, FALSE)
            RETURNING *
            `,
            [userId, opportunityId, reminderDate]
        );

        res.status(201).json({
            success: true,
            message: "Reminder created successfully.",
            reminder: result.rows[0],
        });
    } catch (error) {
        console.error("Error creating reminder:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create reminder.",
        });
    }
});

// DELETE a reminder
router.delete("/:reminderId", async (req, res) => {
    try {
        const reminderId = Number(req.params.reminderId);

        if (!Number.isInteger(reminderId) || reminderId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid reminder ID.",
            });
        }

        const result = await pool.query(
            `
            DELETE FROM reminders
            WHERE id = $1
            RETURNING id
            `,
            [reminderId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Reminder not found.",
            });
        }

        res.json({
            success: true,
            message: "Reminder deleted successfully.",
        });
    } catch (error) {
        console.error("Error deleting reminder:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete reminder.",
        });
    }
});

module.exports = router;