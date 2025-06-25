import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addAgent, deleteAgent, getAgentById, getAllAgents, searchAgent, updateAgent } from "./agent-api";

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

export const useGetAllAgentssHook = () => {
  return useQuery({
    queryKey: ["getAllAgents"],
    queryFn: async () => {
      const response = await getAllAgents();
      return response;
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

export const useGetAgentByIdHook = (id: string) => {
  return useQuery({
    queryKey: ["getAgentById", id],
    queryFn: async () => {
      const response = await getAgentById(id);
      return response;
    },
    enabled: !!id,
  });
};

export const useUpdateAgentHook = () => {
  return useMutation({
    mutationKey: ["updateAgent"],
    mutationFn: async ({
      id,
      formData,
    }: {
      id: string;
      formData: object;
    }): Promise<any> => {
      const response = await updateAgent(id, formData);
      return response;
    },
    onSuccess: () => {
      toast.success("Agent updated successfully");
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

export const useDeleteAgentHook = () => {
  return useMutation({
    mutationKey: ["deleteAgent"],
    mutationFn: async (id: string): Promise<any> => {
      const response = await deleteAgent(id);
      return response;
    },
    onSuccess: () => {
      toast.success("Agent deleted successfully");
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