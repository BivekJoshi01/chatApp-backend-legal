import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addProductManagement = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productManagement/create",
    formData
  );
  return data;
};

export const getAllProductManagements = async () => {
  const { data } = await axiosInstance.get("api/inventory/productManagement/getAll");
  return data;
};

export const searchProductManagements = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productManagement/search",
    formData
  );
  return data;
};

export const getProductManagementById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productManagement/${id}`);
  return data;
};

export const updateProductManagement = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(
    `api/inventory/productManagement/${id}`,
    formData
  );
  return data;
};

export const deleteProductManagement = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/inventory/productManagement/${id}`);
  return data;
};

export const searchProductManagementsByKeyword = async (keyword: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productManagement/keyword?keyword=${keyword}`);
  return data;
};