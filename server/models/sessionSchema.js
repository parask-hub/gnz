const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  sessionStatus: {
    type: String,
    enum: ["scheduled", "ongoing", "completed"],
    default: "scheduled",
  },
  sessionCost: {
    type: Number,
  },
  sessionType: {
    type: String,
    enum: ["videoCall", "chat"],
    required: true,
  },
  totalSessionTime: {
    type: Number, // in minutes
    default: 0,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
