import { axiosInstance } from "../../utils/axiosInterceptor";

export const authenticate = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/user/login",
    formData
  );
  return data;
};

export const register = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/user",
    formData
  );
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("api/user/getAll?search=");
  return data;
};

export const getUserById = async (userId: string): Promise<any> => {
  const { data } = await axiosInstance.get(`api/user/${userId}`);
  return data;
};