const express = require("express");
const Course = require("../../models/course.js");
const User = require("../../models/user.js");

const router = express.Router();

router.post("/complete", async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const enrolledCourse = user.enrolledCourses.find(
      (course) => course.course.toString() === id
    );
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Enrolled course not found" });
    }

    enrolledCourse.completed = !enrolledCourse.completed;
    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
