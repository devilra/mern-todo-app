import axios from "axios";

export const fetchTasks = (status = "") => {
  return axios.get(
    `http://localhost:4000/api/tasks${status ? `?status=${status}` : ""}`
  );
};

export const toggleTaskStatus = (id) => {
  return axios.patch(`http://localhost:4000/api/tasks/${id}/toggle`);
};
