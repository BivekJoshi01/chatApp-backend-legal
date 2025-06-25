import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addArea = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/area/create", formData);
  return data;
};

export const getAreaPaginated = async ({
  pageNumber,
  pageSize,
  search = "",
}: any): Promise<any> => {
  const response = await axiosInstance.get(
    `api/core/area/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${encodeURIComponent(
      search
    )}`
  );
  return response?.data;
};

export const getAllArea = async () => {
  const response = await axiosInstance.get(`api/core/area/getAll}`);
  return response?.data;
};

export const getAreaById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/core/area/${id}`);
  return data;
};

export const updateArea = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(`api/core/area/${id}`, formData);
  return data;
};

export const deleteArea = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/core/area/${id}`);
  return data;
};
