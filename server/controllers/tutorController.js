const Teacher = require("../models/teacherSchema");

const createAccount = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    console.log("Tutor account created successfully");
    res.json(savedTeacher);
  } catch (error) {
    console.error("Error creating tutor account:", error.message);
    res.status(500).json({ error: "Failed to create tutor account" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    const tutorProfile = await Teacher.findOne({ _id: tutorId });

    if (!tutorProfile) {
      return res.status(404).json({ error: "Tutor profile not found" });
    }

    res.json(tutorProfile);
  } catch (error) {
    // Handle any other errors, e.g., database connection issues
    res.status(500).json({ error: "Internal server error" });
  }
};

const editTutor = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedTeacher) {
      console.log("Tutor profile edited successfully");
      res.json(updatedTeacher);
    } else {
      console.error("Tutor not found for editing");
      res.status(404).json({ error: "Tutor not found for editing" });
    }
  } catch (error) {
    console.error("Error editing tutor profile:", error.message);
    res.status(500).json({ error: "Failed to edit tutor profile" });
  }
};

const getAccounts = async (req, res) => {
  try {
    const tutors = await Teacher.find();
    console.log("Tutor accounts retrieved successfully");
    res.json(tutors);
  } catch (error) {
    console.error("Error retrieving tutor accounts:", error.message);
    res.status(500).json({ error: "Failed to retrieve tutor accounts" });
  }
};

const deleteTutor = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndRemove(req.params.id);
    if (deletedTeacher) {
      console.log("Tutor profile deleted successfully");
      res.json(deletedTeacher);
    } else {
      console.error("Tutor not found for deletion");
      res.status(404).json({ error: "Tutor not found for deletion" });
    }
  } catch (error) {
    console.error("Error deleting tutor profile:", error.message);
    res.status(500).json({ error: "Failed to delete tutor profile" });
  }
};

module.exports = {
  createAccount,
  editTutor,
  getAccounts,
  deleteTutor,
  getAccountById,
};
