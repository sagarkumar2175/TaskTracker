// frontend/src/components/TaskList.js
import React, { useState } from "react";

const TaskList = ({ tasks, onDelete, onToggle, onUpdateTitle }) => {
  // track which task is in “edit mode”
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const startEditing = (task) => {
    setEditingId(task._id);
    setNewTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setNewTitle("");
  };

  const submitEdit = (e, id) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onUpdateTitle(id, { title: newTitle.trim() });
    setEditingId(null);
  };

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={task.completed}
              onChange={() => onToggle(task._id, { completed: !task.completed })}
            />
            {editingId === task._id ? (
              <form onSubmit={(e) => submitEdit(e, task._id)} className="d-flex">
                <input
                  type="text"
                  className="form-control form-control-sm me-2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <button className="btn btn-sm btn-success me-1" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  type="button"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <button
                  className="btn btn-sm btn-outline-secondary ms-3"
                  onClick={() => startEditing(task)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

