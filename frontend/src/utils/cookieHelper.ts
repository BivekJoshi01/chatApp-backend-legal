const USER_ID_KEY = "loggedUserId";

export const setLoggedUserId = (data: any): void => {
  console.log("🚀 ~ setLoggedUserId ~ data:", data)
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
