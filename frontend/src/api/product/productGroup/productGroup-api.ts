import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addProductGroup = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productGroup/create",
    formData
  );
  return data;
};

export const getAllProductGroups = async () => {
  const { data } = await axiosInstance.get("api/inventory/productGroup/getAll");
  return data;
};

export const searchProductGroups = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productGroup/search",
    formData
  );
  return data;
};

export const getProductGroupById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productGroup/${id}`);
  return data;
};

export const updateProductGroup = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(
    `api/inventory/productGroup/${id}`,
    formData
  );
  return data;
};

export const deleteProductGroup = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/inventory/productGroup/${id}`);
  return data;
};

export const getProductGroupsByType = async (typeId: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productGroup/type/${typeId}`);
  return data;
};