const User = require("../models/userSchema");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const existingUser = await User.findById(userId);

    console.log(req);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields only if they are provided in the request

    if (req.body.coins) {
      existingUser.coins =
        parseInt(existingUser.coins) + parseInt(req.body.coins);
    }

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

    if (req.file) {
      // If an image file is uploaded, store its path as the profile picture
      existingUser.profilePicture = req.file.path;
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

const getUserData = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCoins = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, amount } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the coins based on the action
    if (action === "increase") {
      user.coins += amount;
    } else if (action === "decrease") {
      if (user.coins < amount) {
        return res.status(400).json({ error: "Insufficient coins" });
      }
      user.coins -= amount;
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    // Save the updated user
    await user.save();

    return res.json({ success: true, coins: user.coins });
  } catch (error) {
    console.error("Error updating coins:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateUser, getUserData, updateCoins };
