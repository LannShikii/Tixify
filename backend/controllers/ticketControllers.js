const Ticket = require("../models/ticketModels");
const db = require("../config/db");

// GET semua tiket
exports.getTickets = async (req, res) => {
    try {
        const data = await Ticket.getAll();

        res.json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET tiket berdasarkan ID
exports.getTicket = async (req, res) => {
    try {
        const data = await Ticket.getById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Ticket tidak ditemukan"
            });
        }

        res.json({
            success: true,
            data
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// CREATE tiket
exports.createTicket = async (req, res) => {
    try {
        await Ticket.create(req.body);

        res.status(201).json({
            success: true,
            message: "Ticket berhasil ditambahkan"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// UPDATE tiket
exports.updateTicket = async (req, res) => {
    try {
        await Ticket.update(req.params.id, req.body);

        res.json({
            success: true,
            message: "Ticket berhasil diupdate"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE tiket
exports.deleteTicket = async (req, res) => {
    try {

        await Ticket.delete(req.params.id);

        await db.query("SET @num := 0");

        await db.query(`
            UPDATE tickets
            SET id = (@num := @num + 1)
            ORDER BY id
        `);

        await db.query("ALTER TABLE tickets AUTO_INCREMENT = 1");

        res.json({
            success: true,
            message: "Ticket berhasil dihapus."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};