const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
    default: Math.random().toString(36).slice(-8), // Generates an 8-character random string
  },
  image: {
    type: String,
    default: "",
  },
  description: {
    type: String,
  },

  mobileNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  hoursMeetTaken: {
    type: Number,
    default: 0,
  },
  ordersCount: {
    type: Number,
    default: 0,
  },
  studentsConnected: {
    type: Number,
    default: 0,
  },
  experience: {
    type: String,
  },
  areaOfInterest: {
    type: String,
  },
  rate: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  userReviews: {
    type: [String], // Array of review strings
  },
  videoCallAvailability: {
    type: Boolean,
    default: false,
  },
  coins: {
    type: Number,
    default: 0,
  },
  // Add more fields as needed
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
