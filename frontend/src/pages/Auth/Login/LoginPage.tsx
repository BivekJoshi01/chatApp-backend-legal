import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthHook } from "../../../api/auth/auth-hook";
import LoadingButton from "../../../components/Button/LoadingButton";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isPending } = useAuthHook();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);

    mutate(
      { formData: data },
      {
        onSuccess: (response) => {
          console.log("Login Successful", response);
        },
        onError: (err) => {
          console.error("Login Failed:", err);
        },
      }
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-semibold text-center mb-8 text-white/90">
        Welcome Back
      </h2>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-5 text-left">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            {...register("email", { required: "Please enter Email" })}
            className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm
          bg-white/20 placeholder-gray-300
          border ${errors.email ? "border-red-500" : "border-white/40"}
          text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-colors`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4 text-left">
          <label htmlFor="password" className="block text-sm font-medium text-white/90">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            {...register("password", { required: "Please enter your password" })}
            className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm
          bg-white/20 placeholder-gray-300
          border ${errors.password ? "border-red-500" : "border-white/40"}
          text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400
          transition-colors`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-5">
          <button
            type="button"
            className="text-sm text-blue-400 hover:underline focus:outline-none"
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <LoadingButton isPending={isPending} btnName="Login" btnLog="Logging in..." />

      </form>
      <div className="text-center mt-5">
        <button
          type="button"
          className="text-sm text-blue-400 hover:underline focus:outline-none"
          onClick={() => navigate("/auth/register")}
        >
          Don't have account? <b>Sign Up</b>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
