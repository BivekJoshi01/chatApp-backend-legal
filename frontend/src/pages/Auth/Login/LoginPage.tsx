import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuthHook } from "../../../api/auth/auth-hook";
import LogoSVG from "../../../assets/Office/GlobeImage.svg";

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

  const { mutate } = useAuthHook();

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
    <div className="bg-[#d7e2f7] shadow-2xl rounded-xl w-full max-w-md px-8 py-10" style={{
      backgroundImage: `url(${LogoSVG})`,
      backgroundRepeat:"no-repeat",
    }}>
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
        Universal Stationery Suppliers
      </h1>
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-8">
        Welcome Back
      </h2>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="email"
            // name="login_email"
            autoComplete="off"
            {...register("email", { required: "Please enter Email" })}
            className={`w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"
              } text-black`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            id="password"
            // name="login_password"
            autoComplete="new-password"
            {...register("password", {
              required: "Please enter your password",
            })}
            className={`w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"
              } text-black`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-5">
          <button
            type="button"
            className="text-sm text-blue-500 hover:underline focus:outline-none"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
