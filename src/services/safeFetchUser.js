import jwt from "jsonwebtoken";
import { fetchThirdPartyUser } from "./thirdParty.service.js";

const safeFetchUser = async (userId, token) => {
  try {
    // 1️ Decode token (no verify, as per your requirement)
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const { role, phoneNumber, userId: myUserId } = decoded;

    // 2️ If NOT admin → return from token (NO API CALL)
    if (role !== "ADMIN") {
      return {
        _id: userId,
        firstName: phoneNumber || "Legal Remit",
        middleName: null,
        lastName: "",
      };
    }

    // 3️ ADMIN → fetch from third-party API
    const res = await fetchThirdPartyUser(userId, token);

    return {
      _id: res.data.id,
      firstName: res.data.firstName,
      middleName: res.data.middleName,
      lastName: res.data.lastName,
    };
  } catch (err) {
    console.warn("safeFetchUser fallback:", err.message);

    // 4️ Ultimate fallback (never break chat)
    return {
      _id: userId,
      firstName: "Legal",
      middleName: null,
      lastName: "Remit",
    };
  }
};

export default safeFetchUser;
