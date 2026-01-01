import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized -no token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }

  req.userId = decoded.userId;
  next();
};
