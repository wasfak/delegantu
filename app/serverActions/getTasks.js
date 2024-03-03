"use server";

import db from "@/db";
import Task from "@/models/TaskModel";
import { auth } from "@clerk/nextjs";

export const getTasks = async () => {
  const { userId } = auth();
  try {
    await db.connectDb();
    const tasks = await Task.find({ clerkId: userId });

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {}
};
