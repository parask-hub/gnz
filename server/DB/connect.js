const mongoose = require("mongoose");

// dotenv.config({ path: "./config.env" });
const DB =
  "mongodb+srv://paraskhilosiyapk24:pzue1Ggd96vI3PMd@cluster0.hyc2iff.mongodb.net/?retryWrites=true&w=majority";

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
