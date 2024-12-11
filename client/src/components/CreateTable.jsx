import React, { useState, useEffect } from "react";
import axios from "axios";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slots = [
  "8:00-9:00", "9:00-10:00", "10:00-11:00", "11:00-11:30", // Break
  "11:30-12:30", "12:30-1:30", "1:30-2:00", // Break
  "2:00-3:00", "3:00-4:00", "4:00-5:00",
];
const breakSlots = ["11:00-11:30", "1:30-2:00"]; // Break slot times

const Timetable = () => {
  const [draggedTeacher, setDraggedTeacher] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch teachers from the backend on component mount
    axios.get("http://localhost:5008/api/teachers")
      .then(response => {
        setTeachers(response.data.teachers);
      })
      .catch(err => console.error("Error fetching teachers:", err));
  }, []);

  const handleDragStart = (teacher) => {
    setDraggedTeacher(teacher);
    setError(""); // Clear error on drag start
  };

  const handleDrop = (day, slotIndex) => {
    const currentSlotId = `${day}-${slotIndex}`;

    // Normal assignment for non-lab sessions
    if (schedule[currentSlotId]) {
      setError("This slot is already occupied.");
      return;
    }
    setSchedule((prev) => ({
      ...prev,
      [currentSlotId]: { teacher: draggedTeacher },
    }));
  };

  const isBreakSlot = (slot) => breakSlots.includes(slot);

  const saveTimetable = () => {
    if (Object.keys(schedule).length === 0) {
      setError("No slots have been assigned.");
      return;
    }

    const teacherSchedules = teachers.reduce((acc, teacher) => {
      const teacherSlots = Object.keys(schedule)
        .filter(slotId => schedule[slotId]?.teacher === teacher.name)
        .map(slotId => {
          const [day, slotIndex] = slotId.split("-");
          return {
            day,
            timeSlot: slots[slotIndex],
            merged: false,
          };
        });

      acc[teacher._id] = teacherSlots.length ? teacherSlots : null; // Null if no slots assigned
      return acc;
    }, {});

    // Save each teacher's timetable to the backend
    Promise.all(
      Object.entries(teacherSchedules).map(([teacherId, timeSlots]) => {
        return axios.post(`http://localhost:5008/api/timetable/generate/${teacherId}`, {
          schedule: timeSlots || [], // Send an empty array if no slots are assigned
        });
      })
    )
      .then(responses => {
        console.log("All timetables saved successfully:", responses);
        alert("All timetables saved successfully!");
      })
      .catch(err => {
        console.error("Error saving timetables:", err);
        setError("Error saving one or more timetables.");
      });
  };

  return (
    <div className="flex">
      {/* Sidebar with Teachers */}
      <div className="w-1/4 p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold mb-4">Teachers</h2>
        {teachers.map((teacher) => (
          <div
            key={teacher._id}
            className="bg-blue-500 p-2 mb-2 rounded cursor-pointer text-center"
            draggable
            onDragStart={() => handleDragStart(teacher.name)}
          >
            {teacher.name}
          </div>
        ))}
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>

      {/* Timetable */}
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Time Table</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-2 py-1">Days</th>
              {slots.map((slot, index) => (
                <th
                  key={index}
                  className={`border border-gray-400 px-2 py-1 ${isBreakSlot(slot) ? "bg-red-500 text-white" : ""}`}
                >
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="border border-gray-400 px-2 py-1 font-bold">{day}</td>
                {slots.map((slot, slotIndex) => {
                  const slotId = `${day}-${slotIndex}`;
                  const currentSlot = schedule[slotId];

                  return (
                    <td
                      key={slotIndex}
                      className={`border border-gray-400 px-2 py-1 ${isBreakSlot(slot) ? "bg-red-500" : ""}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(day, slotIndex)}
                    >
                      {currentSlot ? currentSlot.teacher : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Save button */}
        <button
          onClick={saveTimetable}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Save to Database
        </button>
      </div>
    </div>
  );
};

export default Timetable;
