import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addCustomer = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/customer/create", formData);
  return data;
};


export const searchCustomer = async (formData: object) => {
  const { data } = await axiosInstance.post("api/core/customer/search", formData);
  return data;
};

