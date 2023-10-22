const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoute");
const userRoute = require("./userRoutes");
const tutorRoute = require("./tutorRoutes.js");
const serviceRoute = require("./serviceRoute");

router.get("/", (req, res) => {
  res.send("ok");
});

router.use("/auth", authRoutes);
router.use("/user", userRoute);
router.use("/tutor", tutorRoute);
router.use("/service", serviceRoute);

module.exports = router;
