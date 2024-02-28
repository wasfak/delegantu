"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskModal from "./TaskModal";

export default function EmptyTask({ addNewTask }) {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="bg-[#252525] border-gray-800 rounded-xl shadow-xl flex flex-col items-center justify-center gap-y-4 p-4 text-sm">
      <div>
        <button
          className="flex items-center justify-center gap-x-2 w-full"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus />
          <h2>Add Task</h2>
        </button>
        <TaskModal
          isOpen={isModalOpen}
          closeModal={() => setModalOpen(false)}
          addNewTask={addNewTask}
        />
      </div>
    </div>
  );
}
