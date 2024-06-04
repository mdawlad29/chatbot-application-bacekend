import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      unique: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      unique: true,
    },
    message: { type: String, required: true },
    // createdAt, updatedAt
  },
  { timeStamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
