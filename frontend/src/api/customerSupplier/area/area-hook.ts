import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addArea, getAreaPaginated } from "./area-api";

export const useAddAreaHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["area"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addArea(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Area added successfully");
      queryClient.invalidateQueries({ queryKey: ["getAreaPaginated"] });
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

export const useGetAreaPaginated = ({ pageNumber, pageSize, search = "" }: any) => {
  return useQuery({
    queryKey: ["getAreaPaginated", pageNumber, pageSize, search],
    queryFn: () => getAreaPaginated({ pageNumber, pageSize, search }),
    refetchOnWindowFocus: false,
    refetchInterval: false,
    staleTime: 30000,
  });
};

