import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = React.memo(({ id, tasks, deleteTask }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="task-list p-3 rounded shadow-sm"
          style={{
            minHeight: "150px",
            backgroundColor: "#f8f9fa",
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} deleteTask={deleteTask} />
            ))
          ) : (
            <div className="text-center text-muted p-3">
              <p className="mb-0">No tasks available</p>
            </div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
});

export default Column;
