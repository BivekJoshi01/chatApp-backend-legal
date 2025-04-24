const STORAGE_KEY = "token";
const USER_ID_KEY = "loggedUserId";

interface UserToken {
  token: string | any;
  // refreshToken?: string;
  // expiresIn?: number;
  // Add other fields if needed
}

export const setUserToken = (data: UserToken): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const setLoggedUserId = (data: any): void => {
  localStorage.setItem(USER_ID_KEY, JSON.stringify(data));
};
export const getUserId = (): string | null => {
  const userId = localStorage.getItem(USER_ID_KEY);
  if (!userId || userId === "undefined") return null;

  try {
    return JSON.parse(userId);
  } catch (error) {
    console.error("Failed to parse user ID:", error);
    return null;
  }
};
export const getUserToken = (): UserToken | any => {
  const token = localStorage.getItem(STORAGE_KEY);

  // Safely check for null, "undefined", or empty string
  if (!token || token === "undefined") {
    return null;
  }

  try {
    return JSON.parse(token) as UserToken;
  } catch (e) {
    console.error("Failed to parse user token:", e);
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.clear();
};
