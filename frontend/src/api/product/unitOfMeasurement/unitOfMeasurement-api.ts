import { axiosInstance } from "../../../utils/axiosInterceptor";

export const addUnitOfMeasurement = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/unitOfMeasurement/create",
    formData
  );
  return data;
};

export const searchUnitOfMeasurement = async (formData: object) => {
  const { data } = await axiosInstance.post(
    "api/inventory/unitOfMeasurement/search",
    formData
  );
  return data;
};
