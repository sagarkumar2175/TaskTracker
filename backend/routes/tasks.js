// backend/routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET /api/tasks → list all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/tasks → create a task
router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  try {
    const newTask = new Task({ title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /api/tasks/:id → update title/completed
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/tasks/:id → delete task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
