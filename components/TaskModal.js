import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./ui/button";
import { createTask } from "@/app/serverActions/createTask";

import toast from "react-hot-toast";

export default function TaskModal({ isOpen, closeModal, addNewTask }) {
  const today = new Date().toISOString().split("T")[0];
  const [task, setTask] = useState({
    taskName: "",
    taskDetail: "",
    taskCategory: "",
    taskDate: today,
    taskStatus: "",
  });

  const handleChange = (e) => {
    const { name, value, type, status, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createTask(task);

    toast.success("Task added");

    addNewTask(response);

    setTask({
      taskName: "",
      taskDetail: "",
      taskCategory: "",
      taskDate: today,
      taskStatus: "",
    });
    // Here you would typically handle the form submission to your backend

    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Panel className="w-full max-w-md bg-[#181818] text-white text-sm p-6 rounded-lg shadow">
          <Dialog.Title className="text-lg font-bold">
            Create a Task
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-white">
            {/* Task Name */}
            <div>
              <label
                htmlFor="taskName"
                className="block text-sm font-medium text-white"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                value={task.taskName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2"
              />
            </div>

            {/* Task Detail */}
            <div>
              <label
                htmlFor="taskDetail"
                className="block text-sm font-medium text-white"
              >
                Task Detail
              </label>
              <textarea
                id="taskDetail"
                name="taskDetail"
                value={task.taskDetail}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2"
              ></textarea>
            </div>

            {/* Task Category */}
            <div>
              <label
                htmlFor="taskCategory"
                className="block text-sm font-medium text-white"
              >
                Task Category
              </label>
              <select
                id="taskCategory"
                name="taskCategory"
                value={task.taskCategory}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
              >
                {/* Options can be dynamically rendered based on your application's needs */}
                <option value="" className="text-black p-2">
                  Select a category
                </option>
                <option value="personal" className="text-black p-2">
                  Personal
                </option>
                <option value="work" className="text-black p-2">
                  Work
                </option>
                <option value="other" className="text-black p-2">
                  Other
                </option>
              </select>
            </div>

            {/* Task Date */}
            <div>
              <label
                htmlFor="taskDate"
                className="block text-sm font-medium text-white"
              >
                Task Date
              </label>
              <input
                type="date"
                id="taskDate"
                name="taskDate"
                value={task.taskDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 text-black"
              />
            </div>

            {/* Task Status */}
            <div>
              <label
                htmlFor="taskStatus"
                className="block text-sm font-medium text-white"
              >
                Task Status
              </label>
              <select
                id="taskStatus"
                name="taskStatus"
                value={task.taskStatus}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black p-2"
              >
                <option value="" className="text-black p-2">
                  Select a status
                </option>

                <option value="unassigned" className="text-black p-2">
                  unassigned
                </option>
                <option value="not_started" className="text-black p-2">
                  Not Started
                </option>
                <option value="in_progress" className="text-black p-2">
                  In Progress
                </option>
                <option value="completed" className="text-black p-2">
                  Completed
                </option>
              </select>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
