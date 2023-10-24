const express = require("express");

const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/rechargeRequest", paymentController.rechargeRequest);
router.post("/verifyPayment", paymentController.verifyPayment);

module.exports = router;
