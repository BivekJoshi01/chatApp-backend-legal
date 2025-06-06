import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterHook } from "../../../api/auth/auth-hook";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import LoadingButton from "../../../components/Button/LoadingButton";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const passwordRules = {
  length: (val: string) => val.length >= 8,
  uppercase: (val: string) => /[A-Z]/.test(val),
  lowercase: (val: string) => /[a-z]/.test(val),
  numberOrSymbol: (val: string) => /[\d\W]/.test(val),
};

const isPasswordValid = (value: string) => {
  return (
    passwordRules.length(value) &&
    passwordRules.uppercase(value) &&
    passwordRules.lowercase(value) &&
    passwordRules.numberOrSymbol(value)
  );
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter name"),
  email: yup.string().email("Invalid email format").required("Please enter email"),
  password: yup
    .string()
    .required("Please enter your password")
    .test("password-rules", "Password does not meet criteria", (value = "") => {
      return isPasswordValid(value);
    }),
  confirmPassword: yup
    .string()
    .required("Retype your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterHook();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    mutate(
      { formData: data },
      {
        onSuccess: (response) => console.log("Register Successful", response),
        onError: (err) => console.error("Register Failed:", err),
      }
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-semibold text-center mb-8 text-white/90">
        Welcome
      </h2>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-5 text-left">
          <label htmlFor="name" className="block text-sm font-medium text-white/90">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            {...register("name")}
            className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm bg-white/20 placeholder-gray-300 border ${errors.name ? "border-red-500" : "border-white/40"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5 text-left">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            {...register("email")}
            className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm bg-white/20 placeholder-gray-300 border ${errors.email ? "border-red-500" : "border-white/40"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
          )}
        </div>

        {/* Passwords */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="mb-5 relative text-left flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-white/90">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              {...register("password")}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm pr-10 bg-white/20 placeholder-gray-300 border ${errors.password ? "border-red-500" : "border-white/40"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-[42px] text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

            {/* Password suggestion popover */}
            {passwordInput && !isPasswordValid(passwordInput) && (
              <div className="absolute mt-2 z-10 bg-white shadow-lg rounded-lg p-4 border w-80 text-sm text-gray-800">
                <p className="font-semibold mb-2 text-blue-600">Password must include:</p>
                <ul className="space-y-1">
                  {Object.entries(passwordRules).map(([key, checkFn]) => {
                    const labelMap: Record<string, string> = {
                      length: "At least 8 characters",
                      uppercase: "An uppercase letter",
                      lowercase: "A lowercase letter",
                      numberOrSymbol: "A number or symbol",
                    };
                    const isValid = checkFn(passwordInput);
                    return (
                      <li key={key} className="flex items-center gap-2">
                        {isValid ? (
                          <FaCheckCircle className="text-green-500" />
                        ) : (
                          <FaTimesCircle className="text-red-500" />
                        )}
                        <span>{labelMap[key]}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-5 relative text-left flex-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/90">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`w-full mt-2 px-4 py-2 rounded-lg shadow-sm pr-10 bg-white/20 placeholder-gray-300 border ${errors.confirmPassword ? "border-red-500" : "border-white/40"
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
              placeholder="Confirm"
            />
            <span
              className="absolute right-3 top-[42px] text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1 text-left">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Already Registered */}
        <div className="text-right mb-5">
          <button
            type="button"
            className="text-sm text-blue-400 hover:underline focus:outline-none"
            onClick={() => navigate("/auth/login")}
          >
            Already have an Account? Login
          </button>
        </div>

        <LoadingButton isPending={isPending} btnName="Sign Up" btnLog="Signing up..." />
      </form>
    </div>
  );
};

export default RegisterPage;
