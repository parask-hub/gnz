const Teacher = require("../models/teacherSchema");
const WalletTransaction = require("../models/walletTransactionSchema");

const sendEmailForChatRequest = async (req, res) => {
  try {
    // Get the tutor's email from the tutorId (tutorProfile._id)
    const tutorId = req.params.tutorId;
    const tutor = await Teacher.findById(tutorId);

    if (!tutor) {
      return res.status(404).send("Tutor not found");
    }

    // Extract user information from the request
    const { userName, userEmail, userMobile } = req.body;

    // Send a chat request email to the tutor
    // Use your email service and credentials here (e.g., Gmail)
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
      to: tutor.email,
      subject: "Chat Request from a Student",
      text: `
        You have received a chat request from ${userName}:
        User's Mobile: ${userMobile}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Failed to send chat request");
      } else {
        console.log("Chat request email sent:", info.response);
        res.status(200).send("Chat request sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending chat request:", error);
    res.status(500).send("Failed to send chat request");
  }
};

const meetingend = (req, res) => {
  const meetingEndTime = new Date();
  const meetingDuration = meetingEndTime - meetingStartTime;

  // Do something with the duration (e.g., store in a database)
  console.log("Meeting duration:", meetingDuration);

  res.status(200).send("Meeting ended");
};

const addTransaction = async (req, res) => {
  try {
    const { userId, userType, amount, type, reason } = req.body;

    const newTransaction = new WalletTransaction({
      userId,
      userType,
      amount,
      type,
      reason,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error saving wallet transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getWalletTransaction = async (req, res) => {
  try {
    const userId = req.params.userId;

    const transactions = await WalletTransaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  sendEmailForChatRequest,
  meetingend,
  addTransaction,
  getWalletTransaction,
};
