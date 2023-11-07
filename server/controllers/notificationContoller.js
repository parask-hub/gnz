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
  } = req.body;
  try {
    notification = new Notification(req.body);
    await notification.save();
    res.send({ message: "success" });
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
};
