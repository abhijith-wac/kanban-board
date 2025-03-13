import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Container, Row, Col, Card } from "react-bootstrap";
import AddTaskForm from "./AddTaskForm";
import Column from "./Column";
import useKanban from "../customHooks/useKanban";

const Home = () => {
  const { tasks, addTask, moveTask, deleteTask } = useKanban();

  const handleDragEnd = (event) => {
    const { source, destination } = event;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      return;
    }
    console.log(
      "Moving task from column",
      source.droppableId,
      "to column",
      destination.droppableId
    );

    const taskId = event.draggableId;
    console.log("Moving task with ID:", taskId);
    console.log("Tasks before moving:");
    console.table(tasks);

    moveTask(taskId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container className="mt-5">
        <Row
          style={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <Col xs={12} md={3} className="d-flex flex-column align-items-center">
            <AddTaskForm addTask={addTask} />
          </Col>

          <Col xs={12} md={9}>
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-light">
                <h2 className="text-center mb-0">Task Board</h2>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col xs={12} md={4} className="mb-4 mb-md-0">
                    <Card className="h-100 border">
                      <Card.Header className="bg-light text-center py-3">
                        <h3 className="mb-0 fs-5">To Do</h3>
                      </Card.Header>
                      <Card.Body className="p-2">
                        <Column
                          id="To Do"
                          tasks={tasks.filter(
                            (task) => task.status === "To Do"
                          )}
                          deleteTask={deleteTask}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} md={4} className="mb-4 mb-md-0">
                    <Card className="h-100 border">
                      <Card.Header className="bg-light text-center py-3">
                        <h3 className="mb-0 fs-5">In Progress</h3>
                      </Card.Header>
                      <Card.Body className="p-2">
                        <Column
                          id="In Progress"
                          tasks={tasks.filter(
                            (task) => task.status === "In Progress"
                          )}
                          deleteTask={deleteTask}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col xs={12} md={4} className="mb-4 mb-md-0">
                    <Card className="h-100 border">
                      <Card.Header className="bg-light text-center py-3">
                        <h3 className="mb-0 fs-5">Done</h3>
                      </Card.Header>
                      <Card.Body className="p-2">
                        <Column
                          id="Done"
                          tasks={tasks.filter((task) => task.status === "Done")}
                          deleteTask={deleteTask}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default Home;
