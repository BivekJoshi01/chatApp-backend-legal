import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addProductManagement,
  getAllProductManagements,
  searchProductManagements,
  getProductManagementById,
  updateProductManagement,
  deleteProductManagement,
  searchProductManagementsByKeyword
} from "./productManagement-api";

export const useAddProductManagementHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productManagement"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addProductManagement(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product management added successfully");
      queryClient.invalidateQueries({ queryKey: ["productManagements"] });
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

export const useGetAllProductManagementsHook = () => {
  return useQuery({
    queryKey: ["productManagements"],
    queryFn: async () => {
      const response = await getAllProductManagements();
      return response;
    },
  });
};

export const useSearchProductManagementsHook = () => {
  return useMutation({
    mutationKey: ["searchProductManagements"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchProductManagements(formData);
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

export const useGetProductManagementByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["productManagement", id],
    queryFn: async () => {
      const response = await getProductManagementById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateProductManagementHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProductManagement"],
    mutationFn: async ({ id, formData }: { id: string; formData: object }): Promise<any> => {
      const response = await updateProductManagement(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product management updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productManagements"] });
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

export const useDeleteProductManagementHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProductManagement"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteProductManagement(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Product management deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productManagements"] });
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

export const useSearchProductManagementsByKeywordHook = (keyword: string) => {
  return useQuery({
    queryKey: ["searchProductManagementsByKeyword", keyword],
    queryFn: async () => {
      const response = await searchProductManagementsByKeyword(keyword);
      return response;
    },
    enabled: !!keyword,
  });
};