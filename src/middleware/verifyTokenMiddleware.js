import jwt from "jsonwebtoken";

export const verifyTokenMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Get the token after 'Bearer '

  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if (!decoded) {
    //   return res
    //     .status(401)
    //     .json({ success: false, message: "Unauthorized - invalid token" });
    // }

    // req.userId = decoded.userId; // attach userId to request
    req.userId = "0ab9f3a7-2d0d-4499-83e4-6fe348b09fa6";
    next();
  } catch (error) {
    console.log("🚀 ~ verifyTokenMiddleware ~ error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }
};
