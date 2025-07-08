import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addSalesRecord, searchSales } from "./sell-api";

export const useAddSalesRecordHook = () => {
  return useMutation({
    mutationKey: ["addSalesRecord"],
    mutationFn: async (payload: any): Promise<any> => {
      const response = await addSalesRecord(payload);
      return response;
    },
    onSuccess: () => {
      toast.success("Sales record maintained successfully");
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

export const useSearchSalesHook = () => {
  return useMutation({
    mutationKey: ["searchSales"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchSales(formData);
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

// export const useGetAllAgentsHook = () => {
//   return useQuery({
//     queryKey: ["getAllArea"],
//     queryFn: async () => {
//       const response = await getAllArea();
//       return response;
//     },
//   });
// };

// export const useGetAreaPaginated = ({
//   pageNumber,
//   pageSize,
//   search = "",
// }: any) => {
//   return useQuery({
//     queryKey: ["getAreaPaginated", pageNumber, pageSize, search],
//     queryFn: () => getAreaPaginated({ pageNumber, pageSize, search }),
//     refetchOnWindowFocus: false,
//     refetchInterval: false,
//     staleTime: 30000,
//   });
// };

// export const useGetAreaByIdHook = (id: string) => {
//   return useQuery({
//     queryKey: ["getAreaById", id],
//     queryFn: async () => {
//       const response = await getAreaById(id);
//       return response;
//     },
//     enabled: !!id,
//   });
// };

// export const useUpdateAreaHook = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["updateArea"],
//     mutationFn: async ({
//       id,
//       formData,
//     }: {
//       id: string;
//       formData: object;
//     }): Promise<any> => {
//       const response = await updateArea(id, formData);
//       return response;
//     },
//     onSuccess: () => {
//       toast.success("Area updated successfully");
//       queryClient.invalidateQueries({ queryKey: ["getAreaPaginated"] });
//     },
//     onError: (error: any) => {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Something went wrong";
//       toast.error(message);
//     },
//   });
// };

// export const useDeleteAreaHook = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["deleteArea"],
//     mutationFn: async (id: string): Promise<any> => {
//       const response = await deleteArea(id);
//       return response;
//     },
//     onSuccess: () => {
//       toast.success("Area deleted successfully");
//       queryClient.invalidateQueries({ queryKey: ["getAreaPaginated"] });
//     },
//     onError: (error: any) => {
//       const message =
//         error?.response?.data?.message ||
//         error.message ||
//         "Something went wrong";
//       toast.error(message);
//     },
//   });
// };
