const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/createOrUpdateSession", sessionController.createOrUpdateSession);
router.get("/getsessions", sessionController.getsessions);
router.get("/getsessiondetail/:sessionId", sessionController.getSessionDetails);
router.get("/getsession/tutor/:teacherId", sessionController.getSessionByTutor);
router.get("/getsession/user/:studentId", sessionController.getSessionByUser);
router.post(
  "/sessionstatuscompleted",
  sessionController.setSessionStatusCompleted
);
module.exports = router;
