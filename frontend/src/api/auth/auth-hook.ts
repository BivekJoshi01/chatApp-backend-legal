import { useMutation } from "@tanstack/react-query";
import { authenticate } from "./auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const useAuthHook = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      formData,
    }: {
      formData: LoginFormData;
    }): Promise<AuthResponse> => {
      try {
        const response = await authenticate(formData);
        
        console.log("🚀 ~ useAuthHook ~ response:", response)
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      navigate("Menu/Home");
      toast.success("Login Successful");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Login Failed";
      toast.error(message);
    },
  });
};
