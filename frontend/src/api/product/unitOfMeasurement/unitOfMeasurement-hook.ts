import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addUnitOfMeasurement,
  searchUnitOfMeasurement,
} from "./unitOfMeasurement-api";

export const useAddUnitOfMeasurementHook = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["area"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addUnitOfMeasurement(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Unit of measurement added successfully");
      //   queryClient.invalidateQueries({
      //     queryKey: ["getUnitOfMeasurementPaginated"],
      //   });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};

export const useSearchUnitOfMeasurementHook = () => {
  return useMutation({
    mutationKey: ["unitOfMeasurement"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchUnitOfMeasurement(formData);
      return response;
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};
