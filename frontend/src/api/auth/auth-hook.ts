import { useMutation, useQuery } from "@tanstack/react-query";
import {
  authenticate,
  forgotPassword,
  getAllUsers,
  getLoggedUserData,
  logout,
  register,
  resetPassword,
  verifyEmail,
} from "./auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/reducer/navigationSlice";
import { setLoggedUserId, setLoggedUserRole } from "../../utils/cookieHelper";
import { setUser } from "../../redux/reducer/authSlice";

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
    role: string;
    firstTimeLogin: boolean;
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
      setLoggedUserRole(response?.user?.role);
      if (response?.user?.role === "ADMIN") {
        navigate("/Menu/Home");
      } else {
        if (response?.user?.firstTimeLogin) {
          navigate("/User/onboarding");
        } else {
          navigate("/User/Home");
        }
      }
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
      navigate("/auth/verify-email");
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
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (response) => {
      setLoggedUserId(response?.user?._id);
      setLoggedUserRole(response?.user?.role);
      if (response?.user?.role === "ADMIN") {
        navigate("/Menu/Home");
      } else {
        if (response?.user?.firstTimeLogin) {
          navigate("/User/onboarding");
        } else {
          navigate("/User/Home");
        }
      }
      toast.success("Login Successful");
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

export const useForgotPasswordHook = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: async ({ formData }: any) => {
      try {
        const response = await forgotPassword(formData);
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (response) => {
      navigate("/");
      toast.success(response.message || "Success");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || error.message || "Reset Failed";
      toast.error(message);
    },
  });
};

export const useResetPasswordHook = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: async ({ formData }: any) => {
      try {
        const response = await resetPassword(formData);
        return response;
      } catch (error: any) {
        throw error;
      }
    },
    onSuccess: (response) => {
      navigate("/auth/login");
      toast.success(response.message || "Success");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Reset Password Failed";
      toast.error(message);
    },
  });
};

export const useLogoutHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      dispatch(setUser(null));
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
