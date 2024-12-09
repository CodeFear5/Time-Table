import React, { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const slots = [
  "8:00-9:00",
  "9:00-10:00",
  "10:00-11:00",
  "11:00-11:30", // Break
  "11:30-12:30",
  "12:30-1:30",
  "1:30-2:00", // Break
  "2:00-3:00",
  "3:00-4:00",
  "4:00-5:00",
];

const breakSlots = ["11:00-11:30", "1:30-2:00"]; // Break slot times

const Timetable = () => {
  const [draggedTeacher, setDraggedTeacher] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [error, setError] = useState("");

  const teachers = [
    "Mr. John Doe",
    "Ms. Jane Smith",
    "Dr. Emily White",
    "Prof. Richard Brown",
    "Mrs. Linda Black",
    "Lab Session", // Adding Lab as a subject
  ];

  const handleDragStart = (teacher) => {
    setDraggedTeacher(teacher);
    setError(""); // Clear error on drag start
  };

  const handleDrop = (day, slotIndex) => {
    const currentSlotId = `${day}-${slotIndex}`;
    const nextSlotId = `${day}-${slotIndex + 1}`;

    // Check if it's a lab session and validate consecutive slot
    if (draggedTeacher === "Lab Session") {
      // Check if the next slot is within bounds
      if (slotIndex + 1 >= slots.length || breakSlots.includes(slots[slotIndex + 1])) {
        setError("Lab sessions require two consecutive free slots.");
        return;
      }

      // Check if the next slot is already occupied
      if (schedule[nextSlotId]) {
        setError("The next slot is already occupied. Cannot assign Lab Session.");
        return;
      }

      // Assign Lab to current and next slots as a merged session
      setSchedule((prev) => ({
        ...prev,
        [currentSlotId]: { teacher: draggedTeacher, merged: true },
        [nextSlotId]: { teacher: draggedTeacher, hidden: true },
      }));
    } else {
      // Normal assignment for non-lab sessions
      if (schedule[currentSlotId]) {
        setError("This slot is already occupied.");
        return;
      }
      setSchedule((prev) => ({
        ...prev,
        [currentSlotId]: { teacher: draggedTeacher },
      }));
    }
  };

  const isBreakSlot = (slot) => breakSlots.includes(slot);

  return (
    <div className="flex">
      {/* Sidebar with Teachers */}
      <div className="w-1/4 p-4 bg-gray-800 text-white">
        <h2 className="text-xl font-bold mb-4">Teachers</h2>
        {teachers.map((teacher) => (
          <div
            key={teacher}
            className="bg-blue-500 p-2 mb-2 rounded cursor-pointer text-center"
            draggable
            onDragStart={() => handleDragStart(teacher)}
          >
            {teacher}
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
                  className={`border border-gray-400 px-2 py-1 ${
                    isBreakSlot(slot) ? "bg-red-500 text-white" : ""
                  }`}
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

                  // Skip rendering hidden slots (second part of merged cells)
                  if (currentSlot && currentSlot.hidden) {
                    return null;
                  }

                  return (
                    <td
                      key={slotIndex}
                      colSpan={currentSlot && currentSlot.merged ? 2 : 1}
                      className={`border border-gray-400 px-2 py-1 ${
                        isBreakSlot(slot)
                          ? "bg-red-500"
                          : currentSlot?.teacher === "Lab Session"
                          ? "bg-yellow-300"
                          : ""
                      }`}
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
      </div>
    </div>
  );
};

export default Timetable;
