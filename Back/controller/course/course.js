const express = require("express");
const Course = require("../../models/course.js");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const courses = await Course.find({}, '_id name instructor');
    const courseData = courses.map(course => ({
      id:course._id,
      name: course.name,
      instructor: course.instructor,
    }));


    res.status(200).json({success:true,data:courseData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
