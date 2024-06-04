import mongoose from "mongoose";
conversationSchema;

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timeStamps: true }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
