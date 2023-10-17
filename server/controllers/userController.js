const User = require("../models/userSchema");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields only if they are provided in the request
    if (req.body.firstname) {
      existingUser.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      existingUser.lastname = req.body.lastname;
    }

    if (req.body.interest) {
      existingUser.interest = req.body.interest;
    }

    if (req.body.achievements) {
      existingUser.achievements = req.body.achievements;
    }

    if (req.body.gender) {
      existingUser.gender = req.body.gender;
    }

    if (req.body.englishFluency) {
      existingUser.englishFluency = req.body.englishFluency;
    }

    if (req.body.aboutMe) {
      existingUser.aboutMe = req.body.aboutMe;
    }

    if (req.body.profilePicture) {
      existingUser.profilePicture = req.body.profilePicture;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { updateUser };
