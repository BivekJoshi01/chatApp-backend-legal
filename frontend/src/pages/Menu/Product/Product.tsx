import React from "react";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RenderInput from "../../../components/RenderInput/RenderInput";

// Define validation schema
const validationSchema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  dob: yup.string().required("DOB is required"),
  bio: yup.string(),
  role: yup.string().required("Role is required"),
  agreeTerms: yup.boolean().oneOf([true], "You must agree to terms"),
});

const inputFields: {
  name: string;
  type:
  | "text"
  | "email"
  | "password"
  | "date"
  | "textarea"
  | "dropdown"
  | "checkbox";
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: any;
  error?: FieldError;
  gridClass?: string;
}[] = [
    {
      name: "username",
      type: "text",
      placeholder: "Enter your name",
      label: "User Name",
      required: false,
      gridClass: "col-span-2 md:col-span-1",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      label: "User Name",
      required: true,
      gridClass: "col-span-2 md:col-span-1",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter password",
      label: "User Name",
      required: true,
      gridClass: "col-span-2 md:col-span-1",
    },
    {
      name: "dob",
      type: "date",
      placeholder: "Select date of birth",
      label: "User Name",
      required: true,
      gridClass: "col-span-2 md:col-span-1",
    },
    // {
    //   name: "role",
    //   type: "dropdown",
    //   options: ["Admin", "User", "Guest"],
    //   label: "User Name",
    //   required: true,
    //   gridClass: "col-span-2 md:col-span-1",
    // },
    {
      name: "bio",
      type: "textarea",
      placeholder: "Tell us about yourself",
      label: "User Name",
      required: true,
      gridClass: "col-span-3",
    },

    {
      name: "agreeTerms",
      type: "checkbox",
      gridClass: "col-span-2 flex items-center gap-2",
    },
  ];

const Product: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: object) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3"
    >
      {inputFields.map((field, index) => (
        <div key={index} className={`w-full ${field.gridClass} py-1 px-3`}>
          {/* <RenderInput
            name={field.name}
            fieldType={field.type}
            placeholder={field.placeholder}
            label={field.label}
            required={field.required}
            register={register}
            error={
              errors[field.name as keyof typeof errors] as
              | FieldError
              | undefined
            }
          /> */}
        </div>
      ))}
      <div className="col-span-2 md:col-span-3">
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Product;
