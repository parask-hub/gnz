const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./DB/connect");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();
