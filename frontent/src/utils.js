import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;

export const fetchTasks = (status = "") => {
  return api.get(`/tasks${status ? `?status=${status}` : ""}`);
};

export const toggleTaskStatus = (id) => {
  return api.patch(`/tasks/${id}/toggle`);
};
