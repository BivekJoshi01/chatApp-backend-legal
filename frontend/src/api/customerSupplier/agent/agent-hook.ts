import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAgent, searchAgent } from "./agent-api";

export const useAddAgentHook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["agent"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await addAgent(formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Agent added successfully");
      queryClient.invalidateQueries({ queryKey: ["getAgentPaginated"] });
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


export const useSearchAgentHook = () => {
  return useMutation({
    mutationKey: ["agent"],
    mutationFn: async ({ formData }: any): Promise<any> => {
      const response = await searchAgent(formData);
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
