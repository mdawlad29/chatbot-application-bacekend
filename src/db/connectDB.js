import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const databaseConnected = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `Mongodb connection successful ${databaseConnected.connection.port}`
    );
  } catch (error) {
    console.log(`Mongodb connection error ${error.message}`);
  }
};

export default connectMongoDB;
