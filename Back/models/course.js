const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrollmentStatus: {
    type: String,
    enum: ['Open', 'Closed', 'In Progress'],
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
  prerequisites: {
    type: [String],
  },
  syllabus: [
    {
      week: {
        type: Number,
        required: true,
      },
      topic: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],


});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
