import { useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const useKanban = () => {
    const [tasks, setTasks] = useState(() => {
        try {
            const storedTasks = localStorage.getItem("tasks");
            return storedTasks ? JSON.parse(storedTasks) : [];
        } catch (error) {
            console.error("Error loading tasks from localStorage:", error);
            return [];
        }
    });

    const updateTasks = (newTasks) => {
        setTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        console.log("💾 Tasks saved to localStorage:", newTasks);
    };

    const addTask = (title, description, status) => {
        const newTask = {
            id: uuidv4(),
            title,
            description,
            status,
            color: "orange",
        };

        const updatedTasks = [...tasks, newTask];
        console.log("➕ Task added:", newTask);
        updateTasks(updatedTasks);
    };

    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        console.log("🗑️ Task deleted:", taskId);
        updateTasks(updatedTasks);
        toast.success("Task deleted successfully!");
    };

    const moveTask = (taskId, newColumnId, newIndex) => {
        setTasks((prevTasks) => {
            let taskToMove = null;
            const groupedTasks = prevTasks.reduce(
                (acc, task) => {
                    if (task.id === taskId) {
                        taskToMove = { ...task, status: newColumnId };
                    } else {
                        acc[task.status === newColumnId ? "destinationTasks" : "otherTasks"].push(task);
                    }
                    return acc;
                },
                { destinationTasks: [], otherTasks: [] }
            );

            if (!taskToMove) return prevTasks;

            groupedTasks.destinationTasks.splice(newIndex, 0, taskToMove);

            const updatedTasks = [...groupedTasks.otherTasks, ...groupedTasks.destinationTasks];

            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            console.log("Task moved:", taskToMove);
            return updatedTasks;
        });
    };

    const reorderTasks = (columnId, startIndex, endIndex) => {
        setTasks((prevTasks) => {
            const columnTasks = prevTasks.filter((task) => task.status === columnId);
            const otherTasks = prevTasks.filter((task) => task.status !== columnId);

            if (!columnTasks.length) return prevTasks;

            const [movedTask] = columnTasks.splice(startIndex, 1);
            columnTasks.splice(endIndex, 0, movedTask);

            const updatedTasks = [...otherTasks, ...columnTasks];

            localStorage.setItem("tasks", JSON.stringify(updatedTasks));

            console.log("New task order saved:", columnTasks);
            return updatedTasks;
        });
    };

    return {
        tasks,
        addTask,
        moveTask,
        deleteTask,
        reorderTasks,
    };
};

export default useKanban;
