const mongoose = require('mongoose');

// Define the timetable schema
const timetableSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',  // Reference to the Teacher model
    required: true
  },
  timeSlots: [
    {
      day: String,
      timeSlot: String,
      merged: { type: Boolean, default: false },
      hidden: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });  // Optional: add timestamps for createdAt and updatedAt

// Create the Timetable model and link it to the 'timetable' collection
const Timetable = mongoose.model('Timetable', timetableSchema, 'timetable'); // Explicitly set the collection name

module.exports = Timetable;
