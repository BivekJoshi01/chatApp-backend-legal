import { axiosInstance } from "../../utils/axiosInterceptor";

export const authenticate = async (formData:object) => {
  const { data } = await axiosInstance.post("http://localhost:5000/api/user/login", formData);
  return data;
};
