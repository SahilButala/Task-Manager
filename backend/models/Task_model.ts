import mongoose, { Schema, Document, Model, Types } from "mongoose";

// =====================
// Todo Subdocument Interface
// =====================
export interface ITodo {
  text: string;
  completed: boolean;
}

// =====================
// Task Interface
// =====================
export interface ITask extends Document {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: Date;
  assignedTo: Types.ObjectId[];
  createdBy: Types.ObjectId;
  attachments?: string[];
  todoChecklist?: ITodo[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

// =====================
// Todo Schema
// =====================
const todoSchema = new Schema<ITodo>( 
  {
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

// =====================
// Task Schema
// =====================
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
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
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

// =====================
// Task Model
// =====================
const TaskModel: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default TaskModel;
