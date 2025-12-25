import axios from "axios";

export const getUserFromToken = async (token) => {
  try {
    const response = await axios.get("https://third-party.com/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // usually contains id, email, name, etc.
  } catch (error) {
    throw new Error("Invalid token or failed to fetch user info");
  }
};
