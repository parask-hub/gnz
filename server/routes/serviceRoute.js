const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

router.post(
  "/chat/sendemail/:tutorId",
  serviceController.sendEmailForChatRequest
);

router.post("/addwallet", serviceController.addTransaction);
router.get(
  "/getransaction-datails/:userId",
  serviceController.getWalletTransaction
);

router.post("/meeting/end", serviceController.meetingend);

module.exports = router;
