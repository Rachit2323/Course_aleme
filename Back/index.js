const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { signup, signin } = require("./controller/user.js");
const allenroll= require("./controller/course/allenroll.js");
const enrollCourse =require("./controller/course/enrollCourse.js");
const getAllCourseNamesAndInstructors = require("./controller/course/course.js");
const indiCourse = require("./controller/course/courseIndividual.js");
const coursecomplete=require("./controller/course/coursecomplete.js");
const progressBar=require("./controller/course/progressBar.js");
const search=require("./controller/course/search.js");
const dash=require("./controller/dash/dash.js");
const auth = require("./controller/auth.js");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth/signup", signup);
app.use("/auth/signin", signin);
app.use("/course", auth, getAllCourseNamesAndInstructors);
app.use("/course", auth, indiCourse);
app.use("/enroll", auth, enrollCourse);
app.use("/enroll", auth, allenroll);
app.use("/user",auth,dash);
app.use("/course",auth,coursecomplete);
app.use("/course",auth,progressBar);
app.use("/course",auth,search);


app.get("/", (req, res) => {
  res.send("Hello, I am here and running!");
});

// PORT=4000
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
