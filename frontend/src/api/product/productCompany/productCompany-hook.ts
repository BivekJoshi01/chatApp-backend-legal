import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productCompany"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addProductCompany(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company added successfully");
      queryClient.invalidateQueries({ queryKey: ["productCompanies"] });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProductCompany"],
    mutationFn: async ({ id, formData }: { id: string; formData: object }): Promise<any> => {
      const response = await updateProductCompany(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productCompanies"] });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProductCompany"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteProductCompany(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Product company deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productCompanies"] });
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