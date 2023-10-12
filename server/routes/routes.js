const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use("/auth", authRoutes);

module.exports = router;
