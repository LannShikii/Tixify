const Transaction = require("../models/transactionModels");
const db = require("../config/db");

exports.getTransactions = async (req, res) => {

    try {

        const data = await Transaction.getAll();

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

exports.getTransaction = async (req, res) => {

    try {

        const data = await Transaction.getById(req.params.id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan"
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

exports.createTransaction = async (req, res) => {

    try {

        const {
            ticket_id,
            quantity
        } = req.body;

        // Ambil data tiket
        const [ticket] = await db.query(
            "SELECT * FROM tickets WHERE id=?",
            [ticket_id]
        );

        if (ticket.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Ticket tidak ditemukan"
            });

        }

        // Cek stok
        if (ticket[0].stock < quantity) {

            return res.status(400).json({
                success: false,
                message: "Stok ticket tidak mencukupi"
            });

        }

        // Hitung total harga
        const totalPrice = ticket[0].price * quantity;

        req.body.total_price = totalPrice;

        // Simpan transaksi
        await Transaction.create(req.body);

        // Kurangi stok tiket
        await db.query(
            "UPDATE tickets SET stock = stock - ? WHERE id=?",
            [quantity, ticket_id]
        );

        res.status(201).json({

            success: true,
            message: "Transaksi berhasil dibuat",
            total_price: totalPrice

        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.updateTransaction = async (req, res) => {

    try {

        await Transaction.update(req.params.id, req.body);

        res.json({

            success: true,
            message: "Status pembayaran berhasil diubah"

        });

    } catch (err) {

        res.status(500).json({

            success: false,
            message: err.message

        });

    }

};

exports.deleteTransaction = async (req, res) => {

    try {

        // Hapus transaksi
        await Transaction.delete(req.params.id);

        // Urutkan kembali ID
        await db.query("SET @count = 0");

        await db.query(`
            UPDATE transactions
            SET id = (@count := @count + 1)
            ORDER BY id
        `);

        // Reset AUTO_INCREMENT
        const [rows] = await db.query(
            "SELECT MAX(id) AS maxId FROM transactions"
        );

        const nextId = rows[0].maxId ? rows[0].maxId + 1 : 1;

        await db.query(
            `ALTER TABLE transactions AUTO_INCREMENT = ${nextId}`
        );

        res.json({
            success: true,
            message: "Transaksi berhasil dihapus dan ID berhasil diurutkan."
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};