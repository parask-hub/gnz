const mongoose = require("mongoose");

// dotenv.config({ path: "./config.env" });
const DB =
  "mongodb+srv://Paras:1gNs9uruEMpL8YzZ@cluster0.etcgzf0.mongodb.net/Genz?retryWrites=true&w=majority";

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
