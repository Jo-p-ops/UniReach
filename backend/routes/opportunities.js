const express = require("express");
const router = express.Router();

const pool = require("../db");

/*
|--------------------------------------------------------------------------
| GET ALL OPPORTUNITIES
|--------------------------------------------------------------------------
*/
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
                op.created_at,
                o.id AS organization_id,
                o.name AS organization
            FROM opportunities op
            INNER JOIN organizations o
                ON op.organization_id = o.id
            ORDER BY op.created_at DESC
        `);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("GET /opportunities error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch opportunities."
        });
    }
});


/*
|--------------------------------------------------------------------------
| GET ONE OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid opportunity ID."
            });
        }

        const result = await pool.query(`
            SELECT
                op.id,
                op.title,
                op.description,
                op.opportunity_type,
                op.location,
                op.application_url,
                op.deadline,
                op.created_at,
                o.id AS organization_id,
                o.name AS organization,
                o.description AS organization_description,
                o.website AS organization_website,
                o.email AS organization_email
            FROM opportunities op
            INNER JOIN organizations o
                ON op.organization_id = o.id
            WHERE op.id = $1
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        res.status(200).json({
            success: true,
            opportunity: result.rows[0]
        });
    } catch (error) {
        console.error("GET /opportunities/:id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch opportunity."
        });
    }
});


/*
|--------------------------------------------------------------------------
| CREATE OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.post("/", async (req, res) => {
    try {
        const {
            organization_id,
            title,
            description,
            opportunity_type,
            location,
            application_url,
            deadline
        } = req.body;

        if (
            !organization_id ||
            !title?.trim() ||
            !description?.trim() ||
            !opportunity_type?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "organization_id, title, description, and opportunity_type are required."
            });
        }

        const organizationId = Number(organization_id);

        if (!Number.isInteger(organizationId) || organizationId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid organization_id."
            });
        }

        const result = await pool.query(`
            INSERT INTO opportunities (
                organization_id,
                title,
                description,
                opportunity_type,
                location,
                application_url,
                deadline
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [
            organizationId,
            title.trim(),
            description.trim(),
            opportunity_type.trim(),
            location?.trim() || null,
            application_url?.trim() || null,
            deadline || null
        ]);

        res.status(201).json({
            success: true,
            message: "Opportunity created successfully.",
            opportunity: result.rows[0]
        });
    } catch (error) {
        console.error("POST /opportunities error:", error);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "The selected organization does not exist."
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create opportunity."
        });
    }
});


/*
|--------------------------------------------------------------------------
| UPDATE OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid opportunity ID."
            });
        }

        const {
            organization_id,
            title,
            description,
            opportunity_type,
            location,
            application_url,
            deadline
        } = req.body;

        if (
            !organization_id ||
            !title?.trim() ||
            !description?.trim() ||
            !opportunity_type?.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "organization_id, title, description, and opportunity_type are required."
            });
        }

        const organizationId = Number(organization_id);

        if (!Number.isInteger(organizationId) || organizationId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid organization_id."
            });
        }

        const result = await pool.query(`
            UPDATE opportunities
            SET
                organization_id = $1,
                title = $2,
                description = $3,
                opportunity_type = $4,
                location = $5,
                application_url = $6,
                deadline = $7
            WHERE id = $8
            RETURNING *
        `, [
            organizationId,
            title.trim(),
            description.trim(),
            opportunity_type.trim(),
            location?.trim() || null,
            application_url?.trim() || null,
            deadline || null,
            id
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Opportunity updated successfully.",
            opportunity: result.rows[0]
        });
    } catch (error) {
        console.error("PUT /opportunities/:id error:", error);

        if (error.code === "23503") {
            return res.status(400).json({
                success: false,
                message: "The selected organization does not exist."
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update opportunity."
        });
    }
});


/*
|--------------------------------------------------------------------------
| DELETE OPPORTUNITY
|--------------------------------------------------------------------------
*/
router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid opportunity ID."
            });
        }

        const result = await pool.query(`
            DELETE FROM opportunities
            WHERE id = $1
            RETURNING id, title
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Opportunity not found."
            });
        }

        res.status(200).json({
            success: true,
            message: "Opportunity deleted successfully.",
            opportunity: result.rows[0]
        });
    } catch (error) {
        console.error("DELETE /opportunities/:id error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete opportunity."
        });
    }
});


module.exports = router;