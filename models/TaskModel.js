import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskDetail: {
    type: String,
    required: true,
  },
  taskCategory: [
    {
      type: String,
    },
  ],
  taskDate: {
    type: String,
  },
  taskStatus: {
    type: String,
    default: "on going",
  },
  assingTo: {
    type: String,
  },
});

const Task = models.Task || model("Task", taskSchema);

export default Task;
