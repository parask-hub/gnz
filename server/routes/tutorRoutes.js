const express = require("express");
const router = express.Router();
const tutorController = require("../controllers/tutorController");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder for file uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, "Tutors_" + file.fieldname + "-" + uniqueSuffix + extension);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), tutorController.createAccount);
router.get("/tutorget", tutorController.getAccounts);
router.put("/tutoredit/:id", tutorController.editTutor);
router.delete("/tutordelete/:id", tutorController.deleteTutor);
router.get("/tutorget/:tutorId", tutorController.getAccountById);

module.exports = router;
