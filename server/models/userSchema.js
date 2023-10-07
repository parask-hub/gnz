const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
  },
  interest: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  profilePicture: {
    type: String, // Store file path or link
  },
  coins: {
    type: Number,
    default: 0,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  // Add more fields as needed
});

const User = mongoose.model("User", userSchema);

module.exports = User;
