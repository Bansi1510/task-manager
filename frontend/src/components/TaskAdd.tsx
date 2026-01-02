import React, { useState } from "react";
import type { Task } from "./task";

interface Props {
  onTaskAdded: (task: Task) => void;
}

const TaskAdd: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleAddTask = async () => {
    if (!title || !description || !date) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, date }),
      });

      if (!res.ok) throw new Error("Failed");

      const created: Task = await res.json();
      onTaskAdded(created);

      setTitle("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error(error);
      alert("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md my-6 max-w-5xl mx-auto">
      <h2 className="font-semibold mb-3 text-gray-700 text-lg sm:text-xl">
        Add New Task
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
        <input
          className="border p-2 rounded w-full sm:flex-1"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full sm:flex-1"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          min={today}
          className="border p-2 rounded w-full sm:w-auto"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={handleAddTask}
          disabled={loading}
          className={`px-5 py-2 rounded text-white transition mt-2 sm:mt-0
            ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskAdd;
