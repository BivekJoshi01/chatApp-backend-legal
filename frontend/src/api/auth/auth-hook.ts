import { useMutation, useQuery } from "@tanstack/react-query";
import { authenticate, getAllUsers, register } from "./auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/reducer/navigationSlice";
import { setLoggedUserId, setUserToken } from "../../utils/cookieHelper";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
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
        setUserToken(response?.token);
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (response) => {
      setLoggedUserId(response._id);
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

export const useRegisterHook = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      formData,
    }: {
      formData: RegisterFormData;
    }): Promise<AuthResponse> => {
      try {
        const response = await register(formData);

        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      dispatch(setCurrentPage("Login"));
      toast.success("Sign Up user Successful");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Sign up Failed";
      toast.error(message);
    },
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
    refetchOnWindowFocus: false,
    refetchInterval: undefined,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
