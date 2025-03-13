import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

const Column = ({ id, tasks, deleteTask }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef} 
          {...provided.droppableProps} 
          className="task-list"
          style={{
            minHeight: "150px",
            padding: "10px",
            backgroundColor: "#f4f4f4",
            borderRadius: "8px",
          }}
        >
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} deleteTask={deleteTask} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#aaa" }}>No tasks</p>
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
