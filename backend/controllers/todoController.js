const Task = require("../models/todoModel");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, completed: false });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// exports.getTasks = async (req, res) => {
//   try {
//     const allTasks = await Task.find();
//     res.status(200).json(allTasks);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json(error.message);
//   }
// };

// update GetTasks

exports.getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status === "completed") filter.completed = true;
    if (status === "pending") filter.completed = false;

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json({
      message: "Deleted Task",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

exports.toggleCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
