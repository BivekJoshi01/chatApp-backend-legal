import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addCustomer, getAllCustomer, searchCustomer } from "./customer-api";

export const useAddCustomerHook = () => {
//   const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["customer"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addCustomer(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Customer added successfully");
    //   queryClient.invalidateQueries({ queryKey: ["getAgentPaginated"] });
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


export const useSearchCustomerHook = () => {
  return useMutation({
    mutationKey: ["customer"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchCustomer(formData);
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

export const useGetAllCustomersHook = () => {
  return useQuery({
    queryKey: ["getAllCustomer"],
    queryFn: async () => {
      const response = await getAllCustomer();
      return response;
    },
  });
};