import mongoose, { Schema, Document, Model, Types } from "mongoose";

// ===============================
// Notification Interface
// ===============================
export interface INotification extends Document {
  userId: Types.ObjectId;     // receiver of notification
  taskId: Types.ObjectId;     // related task
  message: string;            // notification text
  isRead: boolean;            // read/unread state
  createdAt: Date;
  updatedAt: Date;
}

// ===============================
// Notification Schema
// ===============================
const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // faster user-based queries
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ===============================
// Notification Model
// ===============================
const NotificationModel: Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", notificationSchema);

export default NotificationModel;
