// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define routes
router.post("/update/:userId", userController.updateUser);

module.exports = router;
