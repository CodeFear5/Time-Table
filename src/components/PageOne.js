import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "tailwindcss/tailwind.css";

const initialSubjects = [
  { id: "sub1", code: "ISE601", name: "AI and ML", teacher: "Dr. A" },
  { id: "sub2", code: "ISE602", name: "Blockchain", teacher: "Dr. B" },
  { id: "sub3", code: "ISE603", name: "Data Science", teacher: "Dr. C" },
  { id: "sub4", code: "ISE604", name: "Cybersecurity", teacher: "Dr. D" },
  { id: "sub5", code: "LAB1", name: "AI Lab", teacher: "Dr. E", isLab: true },
  { id: "sub6", code: "LAB2", name: "Blockchain Lab", teacher: "Dr. F", isLab: true },
];

const initialSchedule = [
  { time: "8:00-9:00", slots: [] },
  { time: "9:00-10:00", slots: [] },
  { time: "10:00-11:00", slots: [] },
  { time: "11:00-11:30", slots: ["Break"] },
  { time: "11:30-12:30", slots: [] },
  { time: "12:30-1:30", slots: [] },
  { time: "1:30-2:00", slots: ["Lunch Break"] },
  { time: "2:00-3:00", slots: [] },
  { time: "3:00-4:00", slots: [] },
  { time: "4:00-5:00", slots: [] },
];

const PageOne = () => {
  const [subjects, setSubjects] = useState(initialSubjects);
  const [schedule, setSchedule] = useState(initialSchedule);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === "subjects") {
      const subject = subjects[source.index];
      const updatedSchedule = [...schedule];

      if (destination.droppableId === "schedule") {
        updatedSchedule[destination.index].slots.push(subject);
        setSchedule(updatedSchedule);
      }
    } else {
      
      const updatedSchedule = [...schedule];
      const sourceSlot = updatedSchedule[source.index];
      const destinationSlot = updatedSchedule[destination.index];
      const [movedSubject] = sourceSlot.slots.splice(source.index, 1);

      destinationSlot.slots.push(movedSubject);
      setSchedule(updatedSchedule);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Timetable Generator</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-4">
          {/* Subjects List */}
          <Droppable droppableId="subjects">
            {(provided) => (
              <div
                className="bg-gray-200 p-4 rounded"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="font-bold mb-2">Subjects</h2>
                {subjects.map((subject, index) => (
                  <Draggable key={subject.id} draggableId={subject.id} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 bg-white rounded shadow mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {subject.name} - {subject.teacher}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

         
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="font-bold mb-2">Timetable</h2>
            {schedule.map((slot, index) => (
              <Droppable key={index} droppableId={`schedule-${index}`} direction="horizontal">
                {(provided) => (
                  <div
                    className="p-2 bg-white rounded shadow mb-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="font-semibold">{slot.time}</div>
                    <div className="flex">
                      {slot.slots.map((subject, subIndex) => (
                        <Draggable
                          key={subject.id}
                          draggableId={subject.id}
                          index={subIndex}
                        >
                          {(provided) => (
                            <div
                              className="p-1 bg-blue-200 rounded shadow m-1"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              {subject.name}
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default PageOne;
































