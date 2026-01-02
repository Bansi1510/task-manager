import React, { useState } from "react";
import type { Task } from "./task";

interface Props {
  onTaskAdded: (task: Task) => void;
}

const TaskAdd: React.FC<Props> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleAddTask = async () => {
    if (!title || !description || !date) return alert("All fields are required!");

    const newTask: Task = { title, description, date };

    try {
      const res = await fetch("http://localhost:1510/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const data: Task = await res.json();
      onTaskAdded(data);

      setTitle("");
      setDescription("");
      setDate("");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Error adding task");
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4 max-w-5xl mx-auto">
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="border p-2 rounded flex-1 min-w-62.5"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 rounded flex-2 min-w-62.5"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={today}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskAdd;
