const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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
  // Add more fields as needed
});

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
