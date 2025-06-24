import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addProductType = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productType/create",
    formData
  );
  return data;
};

export const getAllProductTypes = async () => {
  const { data } = await axiosInstance.get("api/inventory/productType/getAll");
  return data;
};

export const searchProductTypes = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productType/search",
    formData
  );
  return data;
};

export const getProductTypeById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productType/${id}`);
  return data;
};

export const updateProductType = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(
    `api/inventory/productType/${id}`,
    formData
  );
  return data;
};

export const deleteProductType = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/inventory/productType/${id}`);
  return data;
};

export const searchProductTypesByKeyword = async (keyword: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productType/keyword?keyword=${keyword}`);
  return data;
};