const Notification = require("../models/notificationSchema");

const countOfActiveandUnread = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = {
      receiverId: userId,
      state: "active",
      read: false, // Include this condition for unread notifications
    };

    // Use your Notification model to count the notifications based on the query
    const count = await Notification.countDocuments(query);
    res.json({ count });
  } catch (err) {
    console.error("Error counting notifications:", err);
    res.status(500).json({ error: "Unable to count notifications" });
  }
};

const setNotificationAccepted = async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Check if the notification exists
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ msg: "Notification not found" });
    }

    // Check if the notification state is valid
    if (notification.state !== "active") {
      return res.status(400).json({ msg: "Invalid notification state" });
    }

    // Update the notification state to "accepted"
    notification.state = "accepted";
    await notification.save();

    res.json({
      message: "Notification state updated to accepted",
      notification,
    });
  } catch (error) {
    console.error("Error updating notification state:", error);
    res.status(500).json({ msg: "Failed to update notification state" });
  }
};

const sendNotification = async (req, res) => {
  // code to send notification goes here
  const {
    senderId,
    senderModel,
    receiverId,
    receiverModel,
    message,
    timestamp,
    read,
    state,
  } = req.body;

  try {
    // Conditionally set the state based on the value received from the frontend
    const notificationState = state === "accepted" ? "accepted" : "active";

    // Create a new Notification with the conditionally set state
    const notification = new Notification({
      senderId,
      senderModel,
      receiverId,
      receiverModel,
      message,
      timestamp,
      read,
      state: notificationState,
    });

    // Save the notification
    await notification.save();
    res
      .status(201)
      .json({ message: "success", notificationId: notification._id });
  } catch (error) {
    console.log("Error in sending notification: ", error);
    res.status(500).json({ msg: "Failed to send notification." });
  }
};

const receiveNotifications = async (req, res) => {
  let notifications = [];
  const receiverId = req.params.id;
  const receiverModel = req.params.model;

  try {
    if (receiverModel === "User") {
      // Assuming you have a valid 'notification' object defined
      const notification = req.body; // Replace this with your notification object
      await User.findByIdAndUpdate(
        receiverId,
        { $push: { notifications: notification } },
        { new: true }
      );
      notifications = await Notification.find({ receiverId: receiverId });
    } else if (receiverModel === "Teacher") {
      notifications = await Notification.find({ receiverId: receiverId }).sort(
        "-timestamp"
      );
    }

    res.send({ noti: notifications, message: "successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Error occurred while fetching notifications." });
  }
};

const markRead = async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Find the notification by its ID
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Update the "read" status to true
    notification.read = true;

    // Save the updated notification in the database
    await notification.save();

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendNotification,
  receiveNotifications,
  markRead,
  countOfActiveandUnread,
  setNotificationAccepted,
};
