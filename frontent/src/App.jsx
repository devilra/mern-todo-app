import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import axios from "axios";
import api, { fetchTasks, toggleTaskStatus } from "./utils";

const App = () => {
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  useEffect(() => {
    console.log("useEffect Call");

    loadTasks();
  }, []);

  const loadTasks = async (status) => {
    try {
      const res = await fetchTasks(status);
      console.log(res.data);
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/tasks/${editId}`, {
          title,
          description,
        });
      } else {
        if (title.trim() !== "") {
          await api.post("/tasks", {
            title,
            description,
          });
        }
      }
      setTitle("");
      setDescription("");
      setEditId(null);
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const toggleTaskLocal = (id) => {
    setTasks((prev) => {
      return prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      );
    });
  };

  const onToggle = async (id) => {
    try {
      setLoadingTaskId(id);
      toggleTaskLocal(id);
      await toggleTaskStatus(id);
      setLoadingTaskId(null);
      loadTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
      setLoadingTaskId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          📝 Todo App
        </h1>
        {/* ✅ FILTER BUTTONS */}

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => loadTasks()}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
            All
          </button>
          <button
            onClick={() => loadTasks("completed")}
            className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
            Completed
          </button>
          <button
            onClick={() => loadTasks("pending")}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 text-sm">
            Pending
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="text"
            placeholder="Task Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
            {editId ? "update Task" : "Add Task"}
          </button>
        </form>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggle={onToggle}
        loading={loading}
        loadingTaskId={loadingTaskId}
      />
    </div>
  );
};

export default App;
