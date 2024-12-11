const mongoose = require('mongoose');

// Define the Teacher schema
const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // You can add other teacher details like phone, department, etc.
}, { timestamps: true });

// Create a Teacher model from the schema and link it to 'timetable' collection
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers'); // Specify collection name as 'timetable'

module.exports = Teacher;
