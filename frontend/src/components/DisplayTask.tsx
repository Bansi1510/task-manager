import React, { useState } from "react";
import type { Task } from "./task";

interface Props {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
}

const DisplayTask: React.FC<Props> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
  const [filterDate, setFilterDate] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");

  const handleComplete = async (task: Task) => {
    if (!task._id) return;
    try {
      const res = await fetch(`http://localhost:1510/api/task/${task._id}/complete`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated: Task = await res.json();
      onTaskUpdated(updated);
    } catch (error) {
      console.error(error);
      alert("Error updating task");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:1510/api/task/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      onTaskDeleted(id);
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task._id || null);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDate(task.date.split("T")[0]);
  };

  const handleUpdate = async () => {
    if (!editingTaskId) return;
    try {
      const res = await fetch(`http://localhost:1510/api/task/${editingTaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          date: editDate,
        }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated: Task = await res.json();
      onTaskUpdated(updated);
      setEditingTaskId(null);
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Error updating task");
    }
  };

  const filteredTasks = filterDate
    ? tasks.filter((task) => task.date.split("T")[0] === filterDate)
    : tasks;

  return (
    <div className="max-w-5xl mx-auto my-6">
      <h2 className="text-xl font-semibold mb-3">Tasks</h2>

      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Filter by Date:</label>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded"
        />
        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-md overflow-hidden">
        {filteredTasks.length === 0 && (
          <p className="p-4 text-gray-500 text-center">No tasks available</p>
        )}

        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className={`relative flex flex-wrap items-center justify-between border-b p-3 hover:bg-gray-50 ${task.completed ? "bg-green-50 line-through text-gray-500" : ""
              }`}
          >
            <div className="flex-1 min-w-50">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400">{new Date(task.date).toDateString()}</p>
            </div>

            <div className="flex space-x-2 mt-2 sm:mt-0">
              {!task.completed && (
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleComplete(task)}
                >
                  Complete
                </button>
              )}
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleEditClick(task)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => task._id && handleDelete(task._id)}
              >
                Delete
              </button>
            </div>

            {editingTaskId === task._id && (
              <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div className="bg-white bg-opacity-90 border p-4 rounded-md shadow-md w-96 pointer-events-auto">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Title"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Description"
                  />
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingTaskId(null)}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTask;
