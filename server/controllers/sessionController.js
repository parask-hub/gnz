const Session = require("../models/sessionSchema");
const Teacher = require("../models/teacherSchema");
const User = require("../models/userSchema");

const createOrUpdateSession = async (req, res) => {
  try {
    const {
      studentId,
      teacherId,
      startTime,
      endTime,
      sessionStatus,
      sessionCost,
      sessionType,
      totalSessionTime,
    } = req.body;

    // Check if the session already exists based on studentId and startTime
    const existingSession = await Session.findOne({ studentId, startTime });

    if (existingSession) {
      // Update the existing session
      const updatedSession = await Session.findByIdAndUpdate(
        existingSession._id,
        {
          $set: {
            endTime,
            sessionStatus,
            sessionCost,
            sessionType,
            totalSessionTime,
            // Update other fields if needed
          },
        },
        { new: true }
      );

      res.json(updatedSession);
    } else {
      // Create a new session
      const newSession = new Session({
        studentId,
        teacherId,
        startTime,
        endTime,
        sessionStatus,
        sessionCost,
        sessionType,
        totalSessionTime,
        // Add other fields as needed
      });

      const savedSession = await newSession.save();
      res.json(savedSession);
      console.log("Session Added successfully ");
    }
  } catch (error) {
    console.error("Error creating/updating session:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Find the session by sessionId
    const session = await Session.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // You can customize the response based on your needs
    res.json({ session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSessionByTutor = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find all sessions for the given tutor
    const sessions = await Session.find({ teacherId });

    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSessionByUser = async (req, res) => {
  try {
    const { studentId } = req.params;
    const sessions = await Session.find({ studentId });

    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getsessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setSessionStatusCompleted = async (req, res) => {
  try {
    const { sessionId, sessionStatus } = req.body;

    // Validate that sessionStatus is a valid value
    if (!["scheduled", "ongoing", "completed"].includes(sessionStatus)) {
      return res.status(400).json({ error: "Invalid sessionStatus" });
    }

    // Update the session status in the database
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $set: { sessionStatus } },
      { new: true }
    );

    // Return the updated session
    res.json(updatedSession);
  } catch (error) {
    console.error("Error updating session status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createOrUpdateSession,
  getSessionDetails,
  getSessionByTutor,
  getSessionByUser,
  getsessions,
  setSessionStatusCompleted,
};
