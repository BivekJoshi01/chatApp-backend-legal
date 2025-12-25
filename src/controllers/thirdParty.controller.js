import { fetchThirdPartyUser } from "../services/thirdParty.service.js";

export const getThirdPartyUserData = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const data = await fetchThirdPartyUser(userId, token);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
