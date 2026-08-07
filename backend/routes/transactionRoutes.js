console.log("Transaction Routes Loaded");
const express = require("express");

const router = express.Router();

const transactionController = require("../controllers/transactionControllers");

const verifyToken = require("../middlewares/authMiddlewares");

const isAdmin = require("../middlewares/adminMiddlewares");

// GET ALL
router.get(
    "/",
    verifyToken,
    isAdmin,
    transactionController.getTransactions
);

// GET BY ID
router.get(
    "/:id",
    verifyToken,
    isAdmin,
    transactionController.getTransaction
);

// CREATE
router.post(
    "/",
    verifyToken,
    isAdmin,
    transactionController.createTransaction
);

// UPDATE
router.put(
    "/:id",
    verifyToken,
    isAdmin,
    transactionController.updateTransaction
);

// DELETE
router.delete(
    "/:id",
    verifyToken,
    isAdmin,
    transactionController.deleteTransaction
);

module.exports = router;