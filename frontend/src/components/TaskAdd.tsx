import React, { useState } from "react";
import type { Task } from "./task";

interface Props {
  onTaskAdded: (task: Omit<Task, "_id" | "completed">) => void;
}

const TaskAdd: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleAddTask = () => {
    if (!title || !description || !date) return alert("All fields are required!");
    onTaskAdded({ title, description, date });
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full sm:flex-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <label className="flex flex-col gap-1 text-sm text-gray-500 w-full sm:w-[220px]">
          Select Date
          <input
            type="date"
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>


        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskAdd;
