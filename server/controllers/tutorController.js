const Teacher = require("../models/teacherSchema");
const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key";

const generateAccessToken = (user) => {
  return jwt.sign(user, secretKey, { expiresIn: "15m" }); // Token expires in 15 minutes
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, secretKey); // Refresh token does not expire
};

const createAccount = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);

    if (req.file) {
      // If a file was uploaded, save the file path in the `image` field of the newTeacher object
      newTeacher.image = req.file.path;
    }

    const savedTeacher = await newTeacher.save();
    console.log("Tutor account created successfully");
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "paraskhilosiyapkofficial@gmail.com",
        pass: "xaft pokv yvnh youl",
      },
    });

    const mailOptions = {
      from: "paraskhilosiyapkofficial@gmail.com",
      to: savedTeacher.email,
      subject: "Congratulations On being Part OF 'Genz' Tutors",
      html: `
        <p>Congratulations! You have been selected to be a tutor at Genz.</p>
        <p>Your Credentials:</p>
        <ul>
          <li><strong>Password:</strong> ${savedTeacher.password}</li>
          <li><strong>Email:</strong> ${savedTeacher.email}</li>
          <li><strong>Mobile Number:</strong> ${savedTeacher.mobileNumber}</li>
        </ul>
        <p>Click <a href="localhost:3000/ourtutor">here</a> to log in to your account.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Chat request email sent:", info.response);
        window.alert("Email sent to the tutor regarding their credentials.");
        // res.status(200).send("Chat request sent successfully");
      }
    });
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
    // Check if a file is included in the request
    console.log("Requested is : ", req.body);
    if (req.file) {
      req.body.image = req.file.filename; // Update the image field with the new filename
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (updatedTeacher) {
      console.log("Tutor profile edited successfully");
      res.status(200).json(updatedTeacher);
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

const tutorLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Teacher.findOne({
      $or: [{ email: username }, { mobileNumber: username }],
      password: password,
    });

    if (user) {
      const accessToken = generateAccessToken({
        id: user._id,
        username: user.username,
      });
      const refreshToken = generateRefreshToken({
        id: user._id,
        username: user.username,
      });
      return res.status(200).json({ accessToken, refreshToken, id: user._id });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const tokengeneration = (req, res) => {
  const refreshToken = req.body.refreshToken;

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });
    res.json({ accessToken });
  });
};

module.exports = {
  createAccount,
  editTutor,
  getAccounts,
  deleteTutor,
  getAccountById,
  tutorLogin,
  tokengeneration,
};
