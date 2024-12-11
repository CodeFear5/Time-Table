import React, { useState } from "react";

const TeacherManagement = () => {
  const [teacherName, setTeacherName] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [teachersList, setTeachersList] = useState([]);

  // Handle submitting the teacher form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (teacherName && semester && section && subjects.length > 0) {
      setTeachersList([
        ...teachersList,
        {
          name: teacherName,
          semester: semester,
          section: section,
          subjects: subjects,
        },
      ]);
      // Reset form fields
      setTeacherName("");
      setSemester("");
      setSection("");
      setSubjects([]);
      setNewSubject("");
    } else {
      alert("Please fill out all fields.");
    }
  };

  // Handle adding new subjects to the array
  const handleAddSubject = () => {
    if (newSubject) {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-96 bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Teacher Management
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Teacher Name Input */}
          <div>
            <label htmlFor="teacherName" className="block text-gray-700">
              Teacher Name:
            </label>
            <input
              type="text"
              id="teacherName"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Semester and Section Select */}
          <div>
            <label htmlFor="semester" className="block text-gray-700">
              Semester:
            </label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3</option>
              <option value="Semester 4">Semester 4</option>
            </select>
          </div>

          <div>
            <label htmlFor="section" className="block text-gray-700">
              Section:
            </label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>

          {/* Subjects Input */}
          <div>
            <label htmlFor="subjects" className="block text-gray-700">
              Subjects Taught:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="subjects"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddSubject}
                className="ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Subject
              </button>
            </div>
            <div className="mt-2">
              {subjects.length > 0 && (
                <ul>
                  {subjects.map((subject, index) => (
                    <li key={index} className="text-gray-600">
                      {subject}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Teacher
          </button>
        </form>

        {/* Displaying Teachers List */}
        {teachersList.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Teachers List
            </h3>
            <ul className="space-y-2">
              {teachersList.map((teacher, index) => (
                <li
                  key={index}
                  className="p-2 bg-gray-200 rounded flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold">{teacher.name}</span> -{" "}
                    <span>{teacher.semester}</span> -{" "}
                    <span>{teacher.section}</span>
                    <div className="mt-2">
                      Subjects: {teacher.subjects.join(", ")}
                    </div>
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setTeachersList(
                        teachersList.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;
