import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({ title, description, date });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const todayTasks = await Task.find({ date: today });

    const futureTasks = await Task.find({ date: { $gt: today } }).sort({ date: 1 });

    res.json([...todayTasks, ...futureTasks]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const completeTask = async (req, res) => {
  try {
    console.log("hwllo")
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = true;  // mark as completed
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, description, date, completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.date = date ?? task.date;
    task.completed = completed ?? task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

