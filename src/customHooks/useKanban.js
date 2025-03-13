import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";


const useKanban = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    const initialTasks = storedTasks ? JSON.parse(storedTasks) : []; 
    console.log("Initial tasks loaded from localStorage:", initialTasks);
    return initialTasks;
  });

  const updateLocalStorage = (newTasks) => {
    console.log("Saving tasks to localStorage:", newTasks); 
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };


const addTask = (title, description, status) => {
    const newTask = {
        id: uuidv4(), // Generates a unique ID
        title,
        description,
        status,
        color: "orange",
    };

    const updatedTasks = [...tasks, newTask];
    console.log("Task added:", newTask);
    console.log("Updated tasks after addition:", updatedTasks);

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
};


  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    console.log("Task deleted:", taskId);
    console.log("Updated tasks after deletion:", updatedTasks);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    toast.success("Task deleted successfully!");
  };

  const moveTask = (taskId, newStatus) => {
    console.log(
      "moveTask called for task ID:",
      taskId,
      "with new status:",
      newStatus
    );

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    console.log("Updated tasks after moving:", updatedTasks);

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks); 
  };

  return {
    tasks,
    addTask,
    moveTask,
    deleteTask,
  };
};

export default useKanban;
