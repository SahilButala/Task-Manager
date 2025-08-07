import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "High", "Medium"],
      default: "Low",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attachments: [{ type: String }],
    todoChecklist: [todoSchema],
    progress: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const TaskModel = mongoose.model.Task || mongoose.model("Task" , TaskSchema)

export default TaskModel;
