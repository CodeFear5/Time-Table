const mongoose = require('mongoose');
const Timetable = require('../models/Timetable');

// Controller for generating or updating a timetable for a teacher
const generateTimetable = async (req, res) => {
  const { teacherId } = req.params; // Get teacherId from the URL
  const { schedule } = req.body;    // Get the schedule data from the request body

  try {
    // Validate teacherId format
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    // Use `new` to create ObjectId consistently
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    // Find the timetable for the teacher
    let teacherTimetable = await Timetable.findOne({ teacher: teacherObjectId });

    if (!teacherTimetable) {
      // If the teacher doesn't have a timetable, create one
      teacherTimetable = new Timetable({ teacher: teacherObjectId, timeSlots: [] });
    }

    // Process and update the timetable with the new schedule
    schedule.forEach(slot => {
      const existingSlot = teacherTimetable.timeSlots.find(
        item => item.day === slot.day && item.timeSlot === slot.timeSlot
      );

      if (!existingSlot) {
        teacherTimetable.timeSlots.push({
          day: slot.day,
          timeSlot: slot.timeSlot,
          merged: slot.merged || false,
          hidden: slot.hidden || false,
        });
      }
    });

    // Save the updated timetable
    await teacherTimetable.save();

    return res.json({ message: 'Timetable generated successfully', timetable: teacherTimetable });
  } catch (error) {
    console.error('Error generating timetable:', error);
    return res.status(500).json({ message: 'Error generating timetable', error: error.message });
  }
};


// Controller for retrieving the timetable of a teacher
const getTeacherTimetable = async (req, res) => {
  const { teacherId } = req.params;

  try {
    // Validate teacherId format
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacher ID format' });
    }

    const teacherTimetable = await Timetable.findOne({ teacher: teacherId }).populate('teacher');

    if (!teacherTimetable) {
      return res.status(404).json({ message: 'Timetable not found for this teacher' });
    }

    res.json({ message: 'Timetable fetched successfully', timetable: teacherTimetable });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({ message: 'Error fetching timetable', error: error.message });
  }
};

module.exports = {
  generateTimetable,
  getTeacherTimetable
};
