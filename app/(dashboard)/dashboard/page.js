"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

import { getTasks } from "@/app/serverActions/getTasks";

import EmptyTask from "@/components/EmptyTask";
import TaskDisplayer from "@/components/TaskDisplayer";
import { getUserInfo } from "@/app/serverActions/userInfo";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch tasks or perform other actions as needed
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserInfo();
    fetchData();
  }, []);

  const addNewTask = (newTasks) => {
    setTasks(newTasks);
  };

  const handleUnassigned = () => {
    // Set filter to 'unassigned' to apply this filter
    setFilter("unassigned");
  };

  const handleAll = () => {
    // Reset the filter to null to clear the filter
    setFilter(null);
  };

  const displayedTasks =
    filter === "unassigned"
      ? tasks.filter((task) => task.taskStatus === "unassigned")
      : tasks;

  if (loading) {
    return <Loader />;
  }

  if (!mounted) {
    return "";
  }

  if (!userId) {
    router.push("/sign-in");
  }

  return (
    <div className="bg-[#212121] rounded-xl p-4 w-[75vw] font-bold ">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="relative inline-block">
            All Tasks
            <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#27AE60]"></span>
          </h1>
        </div>
        <div className="flex items-center gap-x-4">
          <Button
            onClick={handleUnassigned}
            variant="ghost"
            ariaLabel="unassign task"
          >
            unassigned
          </Button>
          <Button
            onClick={handleAll}
            variant="ghost"
            ariaLabel="show all tasks"
          >
            All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {displayedTasks?.length > 0 ? (
          displayedTasks?.map((task) => (
            <TaskDisplayer
              task={task}
              key={task._id}
              setTasks={setTasks}
              tasks={tasks}
              addNewTask={addNewTask}
            />
          ))
        ) : (
          <EmptyTask addNewTask={addNewTask} />
        )}
        <EmptyTask addNewTask={addNewTask} />
      </div>
    </div>
  );
}
