import type { Task } from "../components/task";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/api/task`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const addTask = async (task: Omit<Task, "_id" | "completed">): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/api/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  if (!task._id) throw new Error("Task ID is required");
  const res = await fetch(`${BASE_URL}/api/task/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
};

export const completeTask = async (id: string): Promise<Task> => {
  const res = await fetch(`${BASE_URL}/api/task/${id}/complete`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to complete task");
  return res.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/api/task/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
};
