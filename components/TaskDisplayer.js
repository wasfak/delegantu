import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Button } from "./ui/button";
import { deleteAction } from "@/app/serverActions/deleteTask";
import { ConfirmModal } from "./ConfirmModal";
import toast from "react-hot-toast";
import ModifyTaskModal from "./ModifyTaskModal";
import AssignModal from "./AssignModal";

export default function TaskDisplayer({ task, setTasks, tasks, addNewTask }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [taskModal, setTaskModal] = useState(false);

  const [assignModal, setAssignModal] = useState(false);

  const handleDeleteTrigger = (taskId) => {
    setTaskIdToDelete(taskId);
    setIsConfirmModalOpen(true);
  };

  const handleModifyTrigger = (task) => {
    setTaskModal(true);
  };

  const handleConfirmDelete = async () => {
    if (taskIdToDelete) {
      await deleteAction(taskIdToDelete);
      setTasks(tasks.filter((task) => task._id !== taskIdToDelete));
      toast.success("Task Deleted");
    }
    setIsConfirmModalOpen(false);

    setTaskIdToDelete(null);
  };

  const handelAssign = async () => {
    setAssignModal(true);
    console.log("done");
  };

  return (
    <div className="bg-[#252525] border-gray-800 rounded-xl shadow-xl flex flex-col items-start justify-between gap-y-4 p-4 text-sm">
      {task.taskStatus === "unassigned" ? (
        <div className="flex items-center justify-between w-full">
          <h2>{task.taskName}</h2>
          <Button onClick={handelAssign}>Assign</Button>
        </div>
      ) : (
        <h2>{task.taskName}</h2>
      )}

      <span>{task.taskDetail}</span>
      <span>{task.taskCategory}</span>
      <span>{task.taskDate}</span>
      <div className="flex items-center justify-between w-full">
        <Button>{task.taskStatus}</Button>
        <div className="flex items-center justify-between gap-x-2">
          <button onClick={() => handleModifyTrigger(task)}>
            <CiEdit className="w-6 h-6" />
          </button>
          <button onClick={() => handleDeleteTrigger(task._id)}>
            <MdDelete className="w-6 h-6" fill="red" />
          </button>
        </div>
        <ConfirmModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this task?"
        />
      </div>
      <ModifyTaskModal
        isOpen={taskModal}
        closeModal={() => setTaskModal(false)}
        task={task}
        addNewTask={addNewTask}
      />
      <AssignModal
        isOpen={assignModal}
        closeModal={() => setAssignModal(false)}
      />
    </div>
  );
}
