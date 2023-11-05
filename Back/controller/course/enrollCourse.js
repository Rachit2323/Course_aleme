const express = require("express");
const Course = require("../../models/course.js");
const User = require("../../models/user.js");

const router = express.Router();

router.post("/ind", async (req, res) => {
  try {
    const { id } = req.query;

    const user = await User.findById(req.userId);

    const isEnrolled = user.enrolledCourses.some(
      (enrollment) => enrollment.course.toString() === id
    );

    if (isEnrolled) {
      user.enrolledCourses = user.enrolledCourses.filter(
        (enrollment) => enrollment.course.toString() !== id
      );

      await user.save();
      return res.status(200).json({success:false, message: "Course removed successfully" });
    }

    user.enrolledCourses.push({
      course: id,
      progress: 0,
      completed: false,
      dueDate: null,
    });

    await user.save();
    res.status(200).json({success:true, message: "Enrollment successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
