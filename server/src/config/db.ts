import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is missing from the .env file.");
    }

    const connection = await mongoose.connect(mongoURI);

    console.log(
      `MongoDB connected successfully: ${connection.connection.host}`
    );
    console.log(
      `Database: ${connection.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;