const User = require("../models/userSchema");

const registerUser = async (req, res) => {
  const { mobileNumber, firstname, lastname } = req.body;

  try {
    // Find the user by mobile number
    let user = await User.findOne({ mobileNumber });

    // If user exists
    if (user) {
      // Check if the names are different, update them if necessary
      if (firstname == "" || lastname == "") {
        return res.json({
          message: "No Info About Name",
          showNamefield: true,
        });
      }
      if (user.firstname !== firstname || user.lastname !== lastname) {
        user.firstname = firstname;
        user.lastname = lastname;
        await user.save();
        return res.json({
          message: "User updated successfully",
          showNamefield: "false",
        });
      }

      // Names are the same, return a message indicating the user already exists
      return res.status(400).json({ message: "User already exists" });
    }

    // User does not exist, create a new user
    user = new User({
      mobileNumber,
      firstname,
      lastname,
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
};
