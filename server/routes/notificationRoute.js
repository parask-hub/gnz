const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationContoller.js");
const schedule = require("node-schedule");
const Notification = require("../models/notificationSchema");

// Schedule a job to run every minute
const job = schedule.scheduleJob("*/1 * * * *", async () => {
  // Calculate the expiration time (5 minutes ago)
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() - 5);

  // Find and update notifications that are older than 5 minutes
  const query = {
    timestamp: { $lt: expirationTime },
    state: "active",
  };

  const update = { state: "expired" };

  const options = { multi: true };

  try {
    const result = await Notification.updateMany(query, update, options);
    console.log(`Updated ${result.nModified} notifications to 'expired'.`);
  } catch (error) {
    console.error("Error updating notifications:", error);
  }
});

// Define routes
router.post("/send", notificationController.sendNotification);
router.get("/receive/:id/:model", notificationController.receiveNotifications);
router.post("/markread/:notificationId", notificationController.markRead);
router.get("/count/:userId", notificationController.countOfActiveandUnread);
module.exports = router;
