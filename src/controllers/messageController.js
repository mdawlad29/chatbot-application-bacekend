import ConversationModel from "../models/conversationModel.js";
import MessageModel from "../models/messageModel.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    return successResponse(res, {
      statusCode: 201,
      message: "Message sent successfully",
      payload: newMessage,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return successResponse(res, {
        statusCode: 200,
        message: "Messages retrieved successfully",
        payload: [],
      });
    }

    const messages = conversation.messages;

    return successResponse(res, {
      statusCode: 200,
      message: "Messages retrieved successfully",
      payload: messages,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};
