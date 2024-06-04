import bcryptjs from "bcryptjs";
import UserModel from "../models/usersModel.js";
import { errorResponse, successResponse } from "../utils/errorHandler.js";
import generateTokenSetCookie from "../utils/generateTokenSetCookie.js";

export const signupUser = async (req, res) => {
  const {
    fullName,
    username,
    email,
    password,
    confirmPassword,
    gender,
    profilePic,
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password don't match" });
  }

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "Username already exists!" });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashPass = await bcryptjs.hash(password, salt);

  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const newUser = {
    fullName,
    email,
    username,
    password: hashPass,
    gender,
    profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
  };

  if (newUser) {
    generateTokenSetCookie(newUser._id, res);
    await UserModel.create(newUser);

    return successResponse(res, {
      statusCode: 201,
      message: "User created successful",
      payload: newUser,
    });
  } else {
    return errorResponse(res, {
      statusCode: 400,
      message: "Invalid user data!",
    });
  }

  try {
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Internal server error" || error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    const isPasswordIncorrect = await bcryptjs.compare(
      password,
      user?.username || ""
    );

    if (!user || !isPasswordIncorrect) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid username or password",
      });
    }

    generateTokenSetCookie(user._id, res);

    return successResponse(res, {
      statusCode: 200,
      message: "User login successful",
      payload: user,
    });
  } catch (error) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Internal server error" || error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.send("logout  router");
};
