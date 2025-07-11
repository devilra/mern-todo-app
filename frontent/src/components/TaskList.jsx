import React, { useState } from "react";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggle,
  loading,
  loadingTaskId,
}) => {
  if (loading) return <p>Loading...</p>;

  if (tasks.length === 0) {
    return (
      <p className="text-center text-4xl font-bold mt-10 text-neutral-700">
        No Tasks
      </p>
    );
  }

  return (
    <div className="space-y-4  my-5">
      {/* <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Tasks Lists
      </h1> */}
      <div>
        {tasks.map((task) => (
          <div
            key={task._id}
            className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition">
            <div>
              <h2
                className={`text-lg font-semibold text-gray-800 ${
                  task.completed
                    ? "line-through text-green-600"
                    : "text-gray-800"
                }`}>
                {task.title}
              </h2>
              {task.description && (
                <p className="text-gray-600">{task.description}</p>
              )}
            </div>
            <div className="mt-2 sm:mt-0 flex flex-wrap gap-2">
              <button
                onClick={() => onToggle(task._id)}
                className={`px-3 py-1 ${
                  task.completed ? "bg-green-500" : "bg-gray-300"
                } hover:opacity-90 text-white rounded-md text-sm`}>
                {/* {task.complete ? "Mark Pending " : "Mark Completed "} */}
                {loadingTaskId === task._id ? (
                  <span className="animate-spin mr-1">🔄</span>
                ) : task.completed ? (
                  "Mark Pending "
                ) : (
                  "Mark Completed "
                )}
              </button>
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md text-sm">
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
