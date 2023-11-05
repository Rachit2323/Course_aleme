const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  enrolledCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      dueDate: {
        type: Date,
      },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
