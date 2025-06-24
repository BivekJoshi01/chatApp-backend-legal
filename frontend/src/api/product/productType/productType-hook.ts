import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addProductType,
  getAllProductTypes,
  searchProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
  searchProductTypesByKeyword
} from "./productType-api";

export const useAddProductTypeHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productType"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addProductType(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product type added successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
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

export const useGetAllProductTypesHook = () => {
  return useQuery({
    queryKey: ["productTypes"],
    queryFn: async () => {
      const response = await getAllProductTypes();
      return response;
    },
  });
};

export const useSearchProductTypesHook = () => {
  return useMutation({
    mutationKey: ["searchProductTypes"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchProductTypes(formData);
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

export const useGetProductTypeByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["productType", id],
    queryFn: async () => {
      const response = await getProductTypeById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateProductTypeHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProductType"],
    mutationFn: async ({ id, formData }: { id: string; formData: object }): Promise<any> => {
      const response = await updateProductType(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product type updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
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

export const useDeleteProductTypeHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProductType"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteProductType(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Product type deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productTypes"] });
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

export const useSearchProductTypesByKeywordHook = (keyword: string) => {
  return useQuery({
    queryKey: ["searchProductTypesByKeyword", keyword],
    queryFn: async () => {
      const response = await searchProductTypesByKeyword(keyword);
      return response;
    },
    enabled: !!keyword,
  });
};