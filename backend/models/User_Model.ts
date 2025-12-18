import mongoose, { Schema, Document, Model, Types } from "mongoose";

// =====================
// User Interface
// =====================
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  role: "admin" | "member";
  createdAt: Date;
  updatedAt: Date;
  tenantId: Types.ObjectId;
}

// =====================
// User Schema
// =====================
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
    },
  },
  {
    timestamps: true,
  }
);

// =====================
// User Model
// =====================
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
