import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskAdd from "./components/TaskAdd";
import DisplayTask from "./components/DisplayTask";
import type { Task } from "./components/task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:1510/api/task")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(console.error);
  }, []);

  const handleTaskAdded = (task: Task) => setTasks([task, ...tasks]);
  const handleTaskUpdated = (updated: Task) =>
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
  const handleTaskDeleted = (id: string) =>
    setTasks(tasks.filter((t) => t._id !== id));

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <TaskAdd onTaskAdded={handleTaskAdded} />
      <DisplayTask
        tasks={tasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
};

export default App;
