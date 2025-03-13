import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import AddTaskForm from "./AddTaskForm";
import Column from "./Column";
import useKanban from "../customHooks/useKanban";

const Home = () => {
    const { tasks, addTask, moveTask, deleteTask, reorderTasks } = useKanban();

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;
        console.log(`🔄 Moving task: ${draggableId} from ${source.droppableId} to ${destination.droppableId}`);

        if (source.droppableId === destination.droppableId) {
            reorderTasks(source.droppableId, source.index, destination.index);
        } else {
            moveTask(draggableId, destination.droppableId, destination.index);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} md={3} className="text-center">
                        <AddTaskForm addTask={addTask} />
                    </Col>

                    <Col xs={12} md={9}>
                        <Card className="shadow-lg border-0">
                            <Card.Header className="bg-white text-center py-3 border-bottom">
                                <h2 className="mb-0 fw-bold">Task Board</h2>
                            </Card.Header>
                            <Card.Body className="p-4">
                                <Row className="g-3">
                                    {["To Do", "In Progress", "Done"].map((status) => (
                                        <Col xs={12} md={4} key={status}>
                                            <Card className="h-100 shadow-sm border-light">
                                                <Card.Header className="bg-light text-center py-2">
                                                    <h5 className="mb-0 fw-semibold">{status}</h5>
                                                </Card.Header>
                                                <Card.Body className="p-3">
                                                    <Column
                                                        id={status}
                                                        tasks={tasks.filter((task) => task.status === status)}
                                                        deleteTask={deleteTask}
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
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
