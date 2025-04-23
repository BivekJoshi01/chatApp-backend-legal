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
