import { axiosInstance } from "../../utils/axiosInterceptor";

export const authenticate = async (formData: object) => {
  const { data } = await axiosInstance.post("api/user/login", formData);
  return data;
};

export const register = async (formData: object) => {
  const { data } = await axiosInstance.post("api/user/signup", formData);
  return data;
};

export const verifyEmail = async (formData: object) => {
  const { data } = await axiosInstance.post("api/user/verify-email", formData);
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.get("api/user/logout");
  return data;
};

export const getLoggedUserData = async () => {
  const { data } = await axiosInstance.get("api/user/check-auth");
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("api/user/getAll");
  return data;
};
