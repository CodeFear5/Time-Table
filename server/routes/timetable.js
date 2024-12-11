// routes/timetable.js
const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// Generate timetable for a teacher
router.post('/generate/:teacherId', timetableController.generateTimetable);

// Get the timetable for a specific teacher
router.get('/:teacherId', timetableController.getTeacherTimetable);

module.exports = router;
