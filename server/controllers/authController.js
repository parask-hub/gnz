const User = require("../models/userSchema");

const registerUser = async (req, res) => {
  const { mobileNumber, firstname, lastname } = req.body;

  try {
    // Find the user by mobile number
    let user = await User.findOne({ mobileNumber });

    // If user exists
    if (user) {
      // Check if the names are different, update them if necessary

      if (
        (user.firstname !== firstname && firstname != "") ||
        (user.lastname !== lastname && lastname != "")
      ) {
        user.firstname = firstname;
        user.lastname = lastname;
        await user.save();
        console.log("Updated User:", user.toObject());
        return res.json({
          message: "User updated successfully",
          showNamefield: false,
          user: user.toObject(),
        });
      }

      // Names are the same, return the existing user object
      console.log("Existing User:", user.toObject());
      return res.json({
        message: "User already exists",
        showNamefield: false,
        user: user.toObject(),
      });
    }

    // User does not exist, create a new user
    user = new User({
      mobileNumber,
      firstname,
      lastname,
    });

    await user.save();

    // Log the new user object
    console.log("New User:", user.toObject());

    // Return the new user object
    res.json({
      message: "User registered successfully",
      user: user.toObject(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const checkIsUserExist = async (req, res) => {
  try {
    const { phoneNumber } = req.params;

    // Check if the mobile number exists in the database
    const user = await User.findOne({ mobileNumber: phoneNumber });

    const exists = !!user; // Convert to boolean

    res.json({ exists });
  } catch (error) {
    console.error("Error checking mobile number:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  checkIsUserExist,
};
