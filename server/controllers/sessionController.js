const Sessions = require("../models/sessionSchema");

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

module.exports = {
  createOrUpdateSession,
};
