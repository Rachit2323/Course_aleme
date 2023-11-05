const express = require("express");
const Course = require("../../models/course.js");

const router = express.Router();

router.post("/search", async (req, res) => {
  try {
    const { keywords } = req.body;

    const query = {
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { instructor: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { schedule: { $regex: keywords, $options: "i" } },
        { location: { $regex: keywords, $options: "i" } },
        { enrollmentStatus: { $regex: keywords, $options: "i" } },
        { duration: { $regex: keywords, $options: "i" } },
        { prerequisites: { $elemMatch: { $regex: keywords, $options: "i" } } },
        {
          syllabus: {
            $elemMatch: {
              topic: { $regex: keywords, $options: "i" },
              content: { $regex: keywords, $options: "i" },
            },
          },
        },
      ],
    };

    const matchingCourses = await Course.find(query);

    res.status(200).json({ success: true, data: matchingCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
