const express = require("express");
const Course = require("../../models/course.js");
const User=require("../../models/user.js");

const router = express.Router();

router.get("/dash", async (req, res) => {
  try {

    // console.log('check ')
    const alldetails = await User.find({ _id: req.userId }).populate({
        path: "enrolledCourses.course", 
        model: "Course", 
      });

    res.status(200).json({success:true, message:"All details of user", data:alldetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
