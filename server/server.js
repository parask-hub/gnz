const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./DB/connect");
const router = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("PCCOE");
});

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
