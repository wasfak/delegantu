"use server";
import db from "@/db";
import Task from "@/models/TaskModel";
import { auth } from "@clerk/nextjs";

export const createTask = async (taskDetails) => {
  const { userId } = auth();
  try {
    await db.connectDb();
    // Ensure taskDetails includes all necessary fields and values
    const newTask = await Task.create({
      ...taskDetails,
      clerkId: userId, // Add the userId to the task details
    });
    const tasks = await Task.find({ clerkId: userId });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Rethrow the error to handle it in the calling context
  }
};
export const updateTask = async (id, taskUpdates) => {
  const { userId } = auth();
  try {
    await db.connectDb();
    // Find the task by ID and userId, and update it with the new values
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, clerkId: userId },
      { $set: taskUpdates },
      { new: true } // Return the updated object
    );

    if (!updatedTask) {
      throw new Error(
        "Task not found or user not authorized to update this task."
      );
    }

    const tasks = await Task.find({ clerkId: userId });
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
