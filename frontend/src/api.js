// frontend/src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "/api/tasks", // because of the proxy, this becomes http://localhost:5000/api/tasks
});

export const fetchTasks = () => API.get("/");
export const createTask = (taskData) => API.post("/", taskData);
export const updateTask = (id, updatedData) => API.put(`/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/${id}`);
