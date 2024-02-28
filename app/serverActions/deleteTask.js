"use server";

import db from "@/db";
import Task from "@/models/TaskModel";
import { auth } from "@clerk/nextjs"; // Ensure auth is correctly imported

export const deleteAction = async (id) => {
  const { userId } = auth();
  try {
    await db.connectDb();
    // Use the task ID and the userId to find and delete the specific task
    const taskDeleted = await Task.findOneAndDelete({
      _id: id,
      clerkId: userId,
    });

    if (!taskDeleted) {
      throw new Error(
        "Task not found or user not authorized to delete this task."
      );
    }

    return JSON.parse(JSON.stringify(taskDeleted));
  } catch (error) {
    console.error("Error deleting task:", error);
    // Consider how you want to handle errors, perhaps throwing them to be caught by the calling function
    throw error;
  }
};
