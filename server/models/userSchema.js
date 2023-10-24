const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required: true,
  },
  lastname: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    default: "No Data Available",
  },
  gender: {
    type: String,
    default: "No Data Available",
  },
  profilePicture: {
    type: String, // Store file path or link
    default: "",
  },
  aboutMe: {
    type: String,
    default: "No Data Available",
  },
  coins: {
    type: Number,
    default: 0,
  },
  englishFluency: {
    type: String,
    default: "No data available",
  },
  achievements: {
    type: String,
    default: "No data available",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  walletDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet", // Assuming Wallet is the name of your wallet schema
  },
  sessionDetails: {
    conductedSessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session", // Assuming Session is the name of your session schema
      },
    ],
    feedbackReceived: [
      {
        feedbackerName: String,
        feedbackMessage: String,
      },
    ],
  },
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

module.exports = User;
