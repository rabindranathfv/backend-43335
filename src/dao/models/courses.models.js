const mongoose = require("mongoose");

const coursesCollection = 'Courses';

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teacher: {
    type: String,
  },
  students: {
    type: Array,
    default: []
  }
});

const coursesModel = mongoose.model(coursesCollection, coursesSchema);
module.exports = coursesModel;