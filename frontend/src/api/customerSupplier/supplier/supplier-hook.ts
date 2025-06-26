import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  addSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  searchSupplier,
  updateSupplier,
} from "./supplier-api";

export const useAddSupplierHook = () => {
  return useMutation({
    mutationKey: ["supplier"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addSupplier(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Supplier added successfully");
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

export const useGetAllSuppliersHook = () => {
  return useQuery({
    queryKey: ["getAllSuppliers"],
    queryFn: async () => {
      const response = await getAllSuppliers();
      return response;
    },
  });
};

export const useSearchSupplierHook = () => {
  return useMutation({
    mutationKey: ["supplier"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchSupplier(formData);
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

export const useGetSupplierByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["getSupplierById", id],
    queryFn: async () => {
      const response = await getSupplierById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateSupplierHook = () => {
  return useMutation({
    mutationKey: ["updateSupplier"],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: object;
    }): Promise<any> => {
      const response = await updateSupplier(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Supplier detail updated successfully");
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

export const useDeleteSupplierHook = () => {
  return useMutation({
    mutationKey: ["deleteSupplier"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteSupplier(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Supplier detail deleted successfully");
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
