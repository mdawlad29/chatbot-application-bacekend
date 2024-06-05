import jwt from "jsonwebtoken";
import UserModel from "../models/usersModel.js";
import { errorResponse } from "../utils/errorHandler.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized - No token provide!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!token) {
      return errorResponse(res, {
        statusCode: 401,
        message: "Unauthorized - Invalid token!",
      });
    }

    const user = await UserModel.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: error.message,
    });
  }
};

export default protectRoute;
