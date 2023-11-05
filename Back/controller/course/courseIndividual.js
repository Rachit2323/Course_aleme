const express = require("express");
const Course = require("../../models/course.js");

const router = express.Router();

router.get("/indi", async (req, res) => {
  try {
    const { id } = req.query;

    const courses = await Course.find({ _id: id });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
