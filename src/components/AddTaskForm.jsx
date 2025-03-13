import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AddTaskForm = ({ addTask }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To Do");
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title, description, status);
      setTitle("");
      setStatus("To Do"); 
      setDescription("");
      handleClose();
      toast.success("Task added successfully!");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="taskTitle">
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="taskDescription" className="mt-2">
              <Form.Control
                as="textarea"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="taskStatus" className="mt-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3 w-100">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTaskForm;
