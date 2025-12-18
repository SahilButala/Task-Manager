import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITenant extends Document {
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const tenantSchema: Schema<ITenant> = new Schema(
  {
    name: {
      type: String
    },
    status: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const Tenant: Model<ITenant> =
  mongoose.models.Tenant || mongoose.model<ITenant>("Tenant", tenantSchema);

export default Tenant;
