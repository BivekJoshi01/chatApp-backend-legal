import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addProductCompany = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productCompany/create",
    formData
  );
  return data;
};

export const getAllProductCompanies = async () => {
  const { data } = await axiosInstance.get("api/inventory/productCompany/getAll");
  return data;
};

export const searchProductCompanies = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/productCompany/search",
    formData
  );
  return data;
};

export const getProductCompanyById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/inventory/productCompany/${id}`);
  return data;
};

export const updateProductCompany = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(
    `api/inventory/productCompany/${id}`,
    formData
  );
  return data;
};

export const deleteProductCompany = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/inventory/productCompany/${id}`);
  return data;
};