import React from 'react';
import { useForgotPasswordHook } from '../../../api/auth/auth-hook';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import LoadingButton from '../../../components/Button/LoadingButton';

const ForgotPassword: React.FC = () => {
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const { mutate,isPending } = useForgotPasswordHook();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    mutate({ formData: data });
  };

  return (
    <div style={{ width: "100%" }}>
      <h2 className="text-xl font-semibold text-center mb-8 text-white/90">
        Forgot Password
      </h2>

      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 text-left">
          <label htmlFor="email" className="block text-sm font-medium text-white/90">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="email"
            autoComplete="off"
            {...register("email", { required: "Please enter Email" })}
            className={`w-full mt-2 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none
              ${errors.email ? "border-red-500" : "border-white/40"} bg-white/20 text-white placeholder-gray-400`}
            placeholder="Enter your email"
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.email.message}</p>
          )} */}
        </div>

        <LoadingButton isPending={isPending}/>
      </form>
      <div className="text-center mt-5">
        <button
          type="button"
          className="text-sm text-blue-400 hover:underline focus:outline-none"
          onClick={() => navigate("/auth/login")}
        >
          Go back to <b>Login Page</b>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
