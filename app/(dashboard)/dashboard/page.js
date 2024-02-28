"use client";
import React, { useEffect, useState } from "react";
import { getTasks } from "@/app/serverActions/getTasks";
import EmptyTask from "@/components/EmptyTask";
import TaskDisplayer from "@/components/TaskDisplayer";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Fetch tasks when the component mounts and whenever there's an update
  useEffect(() => {
    setMounted(true);
    const fetchTasks = async () => {
      setLoading(true);
      const data = await getTasks();

      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []); // The empty dependency array means this effect runs once after the initial render

  const addNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!mounted) {
    return "";
  }
  return (
    <div className="bg-[#212121] rounded-xl p-4 w-[75vw] font-bold">
      <h1 className="relative inline-block">
        All Tasks
        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#27AE60]"></span>
      </h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskDisplayer task={task} key={task._id} setTasks={setTasks} tasks={tasks}/>
          ))
        ) : (
          <EmptyTask addNewTask={addNewTask} />
        )}
        <EmptyTask addNewTask={addNewTask} />
      </div>
    </div>
  );
}
