const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "senderModel",
  },
  senderModel: {
    type: String,
    required: true,
    enum: ["Teacher", "User"], // Indicates whether the sender is a teacher or a user
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "receiverModel",
  },
  receiverModel: {
    type: String,
    required: true,
    enum: ["Teacher", "User"], // Indicates whether the receiver is a teacher or a user
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    enum: ["active", "expired", "accepted"],
    default: "active",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
