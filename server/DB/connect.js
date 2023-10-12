const mongoose = require("mongoose");

// dotenv.config({ path: "./config.env" });
const DB =
  "mongodb+srv://ParasKhilosiya:b0Oa3X7iO2YEUisE@cluster0.frxiams.mongodb.net/Genz?retryWrites=true&w=majority";
const connectDB = () =>
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Successfull");
    })
    .catch((err) => console.log(err));

module.exports = connectDB;
