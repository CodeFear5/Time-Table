import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GenerateTable = () => {
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const navigate = useNavigate();

  // Predefined list of teachers
  const teachersList = [
    "Mr. John Doe",
    "Ms. Jane Smith",
    "Dr. Emily White",
    "Prof. Richard Brown",
    "Mrs. Linda Black",
  ];

  const handleTeacherSelection = (teacher) => {
    if (selectedTeachers.includes(teacher)) {
      setSelectedTeachers(selectedTeachers.filter((t) => t !== teacher));
    } else {
      setSelectedTeachers([...selectedTeachers, teacher]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (semester && section && selectedTeachers.length > 0) {
      // Navigate to the next page with selected data
      navigate("/create-table", {
        state: { semester, section, selectedTeachers },
      });
    } else {
      alert("Please fill all the fields and select at least one teacher.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center">Generate Table</h2>

        {/* Semester Dropdown */}
        <div>
          <label htmlFor="semester" className="block text-gray-700 font-semibold">
            Select Semester:
          </label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Semester--</option>
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{`${i + 1} Semester`}</option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div>
          <label htmlFor="section" className="block text-gray-700 font-semibold">
            Select Section:
          </label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select Section--</option>
            {["A", "B", "C", "D"].map((sec) => (
              <option key={sec} value={sec}>{`Section ${sec}`}</option>
            ))}
          </select>
        </div>

        {/* Teacher Selection */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Select Teachers:
          </label>
          <div className="space-y-2">
            {teachersList.map((teacher) => (
              <div key={teacher} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={teacher}
                  value={teacher}
                  checked={selectedTeachers.includes(teacher)}
                  onChange={() => handleTeacherSelection(teacher)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <label htmlFor={teacher} className="text-gray-700">
                  {teacher}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Proceed
        </button>
      </form>
    </div>
  );
};

export default GenerateTable;
