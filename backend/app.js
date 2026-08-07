require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

// Default Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Concert Ticket API Running Successfully"
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;