import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addProductGroup,
  getAllProductGroups,
  searchProductGroups,
  getProductGroupById,
  updateProductGroup,
  deleteProductGroup,
  getProductGroupsByType
} from "./productGroup-api";

export const useAddProductGroupHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["productGroup"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addProductGroup(formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product group added successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
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

export const useGetAllProductGroupsHook = () => {
  return useQuery({
    queryKey: ["productGroups"],
    queryFn: async () => {
      const response = await getAllProductGroups();
      return response;
    },
  });
};

export const useSearchProductGroupsHook = () => {
  return useMutation({
    mutationKey: ["searchProductGroups"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchProductGroups(formData);
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

export const useGetProductGroupByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["productGroup", id],
    queryFn: async () => {
      const response = await getProductGroupById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateProductGroupHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateProductGroup"],
    mutationFn: async ({ id, formData }: { id: string; formData: object }): Promise<any> => {
      const response = await updateProductGroup(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Product group updated successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
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

export const useDeleteProductGroupHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteProductGroup"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteProductGroup(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Product group deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["productGroups"] });
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

export const useGetProductGroupsByTypeHook = (typeId: string) => {
  return useQuery({
    queryKey: ["productGroupsByType", typeId],
    queryFn: async () => {
      const response = await getProductGroupsByType(typeId);
      return response;
    },
    enabled: !!typeId,
  });
};