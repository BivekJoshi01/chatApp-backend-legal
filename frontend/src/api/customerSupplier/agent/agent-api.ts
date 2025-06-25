import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/create", formData);
  return data;
};

export const getAllAgents = async () => {
  const { data } = await axiosInstance.get("api/core/agent/getAll");
  return data;
};

export const searchAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/search", formData);
  return data;
};

export const getAgentById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/core/agent/${id}`);
  return data;
};

export const updateAgent = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(`api/core/agent/${id}`, formData);
  return data;
};

export const deleteAgent = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/core/agent/${id}`);
  return data;
};
