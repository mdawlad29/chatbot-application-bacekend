import UserModel from "../models/usersModel.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";

export const getLoggedInUserId = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const findUsers = await UserModel.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    return successResponse(res, {
      statusCode: 200,
      message: "Get all users.",
      payload: findUsers,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 400,
      message: error.message,
    });
  }
};
