import React from "react";
import { Draggable } from "@hello-pangea/dnd"; 
import { Button, Card } from "react-bootstrap"; 

const TaskCard = ({ task, index, deleteTask }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          className={`mb-2 task-card ${task.color}`} 
        >
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <Button
              variant="danger"
              onClick={() => deleteTask(task.id)} 
              size="sm"
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      )}
    </Draggable>
  );
};

export default TaskCard;
