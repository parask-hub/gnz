// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define routes
router.post("/register", authController.registerUser);
router.get("/isuserexist/:phoneNumber", authController.checkIsUserExist);
router.get("/reg", (req, res) => {
  res.send("working");
});

module.exports = router;
