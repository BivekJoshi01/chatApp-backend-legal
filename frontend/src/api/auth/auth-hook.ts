import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authenticate,
  getAllUsers,
  getLoggedUserData,
  logout,
  register,
  verifyEmail,
} from "./auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/reducer/navigationSlice";
import { setLoggedUserId } from "../../utils/cookieHelper";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface VerifyEmailData {
  code: string;
}

interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    pic: string;
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
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (response) => {
      setLoggedUserId(response?.user?._id);
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
  const navigate = useNavigate();

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
      navigate("/verify-email");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Sign up Failed";
      toast.error(message);
    },
  });
};

export const useVerifyEmailHook = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: async ({
      formData,
    }: {
      formData: VerifyEmailData;
    }): Promise<AuthResponse> => {
      try {
        const response = await verifyEmail(formData);
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Email Verified Successful");
      navigate("/Menu/Home");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Email Verified Failed";
      toast.error(message);
    },
  });
};

export const useLogoutHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        const response = await logout();
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      navigate("/");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Logout error";
      toast.error(message);
    },
  });
};

export const useGetLoggedUserData = () => {
  return useQuery({
    queryKey: ["getLoggedUserData"],
    queryFn: getLoggedUserData,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useGetAllUser = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
