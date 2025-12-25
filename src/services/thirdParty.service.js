import thirdPartyApi from "./thirdPartyApi.js";


export const fetchThirdPartyUser = async (userId, token) => {
  try {
    const response = await thirdPartyApi.get(`user/getbyid/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Third-party API error");
  }
};
