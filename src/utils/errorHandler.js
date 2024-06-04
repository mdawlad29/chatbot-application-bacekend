export const errorResponse = (
  res,
  { statusCode = 500, message = "Internal server error" }
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};

export const successResponse = (
  res,
  { statusCode = 200, message = "Success", payload = {} }
) => {
  return res.status(statusCode).json({
    status: statusCode,
    message: message,
    data: payload,
  });
};
