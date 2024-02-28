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
    console.log("Task created successfully:");
    return "DONE"; // Return the newly created task
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Rethrow the error to handle it in the calling context
  }
};
