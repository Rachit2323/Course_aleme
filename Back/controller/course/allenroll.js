const express = require("express");
const Course = require("../../models/course.js");
const User = require("../../models/user.js");

const router = express.Router();

router.post("/all", async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourses = user.enrolledCourses.map(
      (enrollment) => enrollment.course
    );

    res.status(200).json({ success: true, data:enrolledCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
