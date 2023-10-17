const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");
const userRoute = require("./userRoutes");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use("/auth", authRoutes);
router.use("/user", userRoute);

module.exports = router;
