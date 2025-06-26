import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addSupplier = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/core/supplier/create",
    formData
  );
  return data;
};

export const getAllSuppliers = async () => {
  const { data } = await axiosInstance.get("api/core/supplier/getAll");
  return data;
};

export const searchSupplier = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/core/supplier/search",
    formData
  );
  return data;
};

export const getSupplierById = async (id: string) => {
  const { data } = await axiosInstance.get(`api/core/supplier/${id}`);
  return data;
};

export const updateSupplier = async (id: string, formData: object) => {
  const { data } = await axiosInstance.put(`api/core/supplier/${id}`, formData);
  return data;
};

export const deleteSupplier = async (id: string) => {
  const { data } = await axiosInstance.delete(`api/core/supplier/${id}`);
  return data;
};
