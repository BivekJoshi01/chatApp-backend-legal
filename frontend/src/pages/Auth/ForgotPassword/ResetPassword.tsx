import React, { useState } from "react";
import { useResetPasswordHook } from "../../../api/auth/auth-hook";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoadingButton from "../../../components/Button/LoadingButton";

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { id } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const { mutate, isPending } = useResetPasswordHook();

  const onSubmit = (data: FormData) => {
    mutate({
      formData: {
        ...data,
        id,
      },
    });
  };

  const passwordValue = watch("password", "");

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-semibold text-center mb-8 text-white/90">
        Change Password
      </h2>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white/90 text-left"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            {...register("password", { required: "Please enter password" })}
            className={`w-full mt-2 px-4 py-2 border rounded-lg shadow-sm pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.password ? "border-red-500" : "border-white/40"
              } bg-white/20 text-white placeholder-gray-400`}
            placeholder="Enter your password"
          />
          <span
            className="absolute right-3 top-[42px] text-gray-300 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-white/90 text-left"
          >
            Confirm Password <span className="text-red-600">*</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            className={`w-full mt-2 px-4 py-2 border rounded-lg shadow-sm pr-10 focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-white/40"
              } bg-white/20 text-white placeholder-gray-400`}
            placeholder="Confirm your password"
          />
          <span
            className="absolute right-3 top-[42px] text-gray-300 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <LoadingButton isPending={isPending} btnName="Change Password" btnLog="Changing Password..." />
      </form>
    </div>
  );
};

export default ResetPassword;
