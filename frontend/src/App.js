// frontend/src/App.js
import React, { useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch all tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const res = await fetchTasks();
        setTasks(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tasks");
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  // 2. Add a new task
  const handleAdd = async (taskData) => {
    try {
      const res = await createTask(taskData);
      // Prepend new task so newest shows on top
      setTasks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    }
  };

  // 3. Toggle completion or update title
  const handleToggle = async (id, updatedFields) => {
    try {
      const res = await updateTask(id, updatedFields);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  // 4. Update title specifically (called from TaskList)
  const handleUpdateTitle = async (id, updatedFields) => {
    await handleToggle(id, updatedFields);
  };

  // 5. Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">TaskTracker To-Do List</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <TaskForm onAdd={handleAdd} />
      {loading ? (
        <p>Loading tasks…</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add one above!</p>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onUpdateTitle={handleUpdateTitle}
        />
      )}
    </div>
  );
};

export default App;
