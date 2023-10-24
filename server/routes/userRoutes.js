// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for file uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, "Users_" + file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

// Define routes
router.post(
  "/update/:userId",
  upload.single("profilePicture"),
  userController.updateUser
);

module.exports = router;
