const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.post(
  "/chat/sendemail/:tutorId",
  serviceController.sendEmailForChatRequest
);

module.exports = router;