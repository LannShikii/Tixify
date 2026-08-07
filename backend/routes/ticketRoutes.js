const express = require("express");

const router = express.Router();

const ticketController = require("../controllers/ticketControllers");

const verifyToken = require("../middlewares/authMiddlewares");

const isAdmin = require("../middlewares/adminMiddlewares");

// Semua endpoint ticket harus login sebagai admin

router.get("/", verifyToken, isAdmin, ticketController.getTickets);

router.get("/:id", verifyToken, isAdmin, ticketController.getTicket);

router.post("/", verifyToken, isAdmin, ticketController.createTicket);

router.put("/:id", verifyToken, isAdmin, ticketController.updateTicket);

router.delete("/:id", verifyToken, isAdmin, ticketController.deleteTicket);

module.exports = router;