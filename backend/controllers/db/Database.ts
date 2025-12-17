import mongoose from "mongoose";

export const DatabaseConnection = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URL;

    if (!mongoUri) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    await mongoose
      .connect(mongoUri)
      .then(() => console.log("✅ Database connected successfully"));
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // stop server if DB fails
  }
};
