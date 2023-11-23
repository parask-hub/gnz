const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/createOrUpdateSession", sessionController.createOrUpdateSession);

module.exports = router;
