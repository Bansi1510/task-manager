import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskAdd from "./components/TaskAdd";
import DisplayTask from "./components/DisplayTask";
import type { Task } from "./components/task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/task");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (task: Task) =>
    setTasks((prev) => [task, ...prev]);

  const handleTaskUpdated = (updated: Task) =>
    setTasks((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );

  const handleTaskDeleted = (id: string) =>
    setTasks((prev) => prev.filter((t) => t._id !== id));

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <TaskAdd onTaskAdded={handleTaskAdded} />
      <DisplayTask
        tasks={tasks}
        loading={loading}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
};

export default App;
