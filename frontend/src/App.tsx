import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskAdd from "./components/TaskAdd";
import DisplayTask from "./components/DisplayTask";
import type { Task } from "./components/task";
import { fetchTasks, addTask, updateTask, deleteTask, completeTask } from "./services/task.service"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleTaskAdded = async (task: Omit<Task, "_id" | "completed">) => {
    try {
      const newTask = await addTask(task);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    }
  };

  const handleTaskUpdated = async (task: Task) => {
    try {
      const updated = await updateTask(task);
      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskDeleted = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskComplete = async (id: string) => {
    try {
      const updated = await completeTask(id);
      setTasks(tasks.map(t => (t._id === updated._id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <TaskAdd onTaskAdded={handleTaskAdded} />
      <DisplayTask
        tasks={tasks}
        loading={loading}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

export default App;
