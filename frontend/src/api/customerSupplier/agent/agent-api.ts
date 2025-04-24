import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/create", formData);
  return data;
};


export const searchAgent = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/agent/search", formData);
  return data;
};

export const getAgentSearch = async ({
  pageNumber,
  pageSize,
  search = "",
}: any): Promise<any> => {
  const response = await axiosInstance.get(
    `api/core/agent/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${encodeURIComponent(
      search
    )}`
  );
  return response?.data;
};
