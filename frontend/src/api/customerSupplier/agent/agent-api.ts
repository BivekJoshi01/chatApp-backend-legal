import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/create", formData);
  return data;
};


export const searchAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/search", formData);
  return data;
};
