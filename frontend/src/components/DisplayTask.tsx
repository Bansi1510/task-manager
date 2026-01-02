import React, { useState } from "react";
import type { Task } from "./task";

interface Props {
  tasks: Task[];
  loading: boolean;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (id: string) => void;
  onTaskComplete: (id: string) => void;
}

const DisplayTask: React.FC<Props> = ({
  tasks,
  loading,
  onTaskUpdated,
  onTaskDeleted,
  onTaskComplete,
}) => {
  const [filterDate, setFilterDate] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);

  const filteredTasks = filterDate
    ? tasks.filter((t) => t.date.split("T")[0] === filterDate)
    : tasks;

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-5xl mx-auto mb-10 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-2 rounded w-full sm:max-w-[220px]"
        />

        {filterDate && (
          <button
            onClick={() => setFilterDate("")}
            className="text-sm text-blue-600 self-start sm:self-center"
          >
            Clear
          </button>
        )}
      </div>

      {/* Task list */}
      {
        filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3
                ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-sm text-gray-400">{new Date(task.date).toDateString()}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                  {!task.completed && (
                    <button
                      onClick={() => onTaskComplete(task._id!)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => setEditing(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onTaskDeleted(task._id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }

      {/* Edit Modal */}
      {
        editing && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Task</h3>

              <input
                className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
                placeholder="Title"
              />

              <textarea
                className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editing.description}
                onChange={(e) =>
                  setEditing({ ...editing, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
              />

              <input
                type="date"
                className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={editing.date.split("T")[0]}
                min={today}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
              />

              <div className="flex justify-end gap-3 flex-wrap">
                <button
                  onClick={() => setEditing(null)}
                  className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onTaskUpdated(editing);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>

              <button
                onClick={() => setEditing(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default DisplayTask;
