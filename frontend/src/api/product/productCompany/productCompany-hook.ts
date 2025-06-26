import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addProductCompany,
  getAllProductCompanies,
  searchProductCompanies,
  getProductCompanyById,
  updateProductCompany,
  deleteProductCompany
} from "./productCompany-api";

export const useAddProductCompanyHook = () => {
  return useMutation({
    mutationKey: ["productCompany"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addProductCompany(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company added successfully");
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

export const useGetAllProductCompaniesHook = () => {
  return useQuery({
    queryKey: ["productCompanies"],
    queryFn: async () => {
      const response = await getAllProductCompanies();
      return response;
    },
  });
};

export const useSearchProductCompaniesHook = () => {
  return useMutation({
    mutationKey: ["searchProductCompanies"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchProductCompanies(formData);
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

export const useGetProductCompanyByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["productCompany", id],
    queryFn: async () => {
      const response = await getProductCompanyById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateProductCompanyHook = () => {
  return useMutation({
    mutationKey: ["updateProductCompany"],
    mutationFn: async ({ id, formData }: { id: string; formData: object }): Promise<any> => {
      const response = await updateProductCompany(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company updated successfully");
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

export const useDeleteProductCompanyHook = () => {
  return useMutation({
    mutationKey: ["deleteProductCompany"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteProductCompany(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company deleted successfully");
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