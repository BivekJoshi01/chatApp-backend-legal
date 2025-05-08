import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

type DropdownOption = {
  label: string;
  value: string | number;
};

interface RenderInputProps {
  name: string;
  fieldType:
  | "text"
  | "number"
  | "textarea"
  | "email"
  | "dropdown"
  | "password"
  | "date"
  | "checkbox";
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: DropdownOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
}

const RenderInput: React.FC<RenderInputProps> = ({
  name,
  fieldType,
  placeholder,
  label,
  required,
  options,
  register,
  error,
}) => {
  const baseClass =
    "w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";


  const renderField = () => {
    switch (fieldType) {
      case "text":
      case "email":
      case "number":
      case "password":
      case "date":
        return (
          <>
            <div>{label}{" "}{required && <span className="text-red-500 text-sm">*</span>}</div>
            <input
              type={fieldType}
              {...register(name)}
              placeholder={placeholder}
              className={baseClass}
            />
          </>
        );

      case "textarea":
        return (
          <>
            <div>{label}</div>
            <textarea
              {...register(name)}
              placeholder={placeholder}
              className={baseClass}
            />
          </>
        );

      case "dropdown":
        return (
          <>
            <div>{label}</div>
            <select
              {...register(name)}
              id={name}
              className={baseClass}
              defaultValue=""
            >
              <option value="" disabled>
                {placeholder || "Select an option"}
              </option>
              {options?.map((option, index) => (
                <option key={index} value={option.value || option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </>

        );

      case "checkbox":
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register(name)}
              className="w-4 h-4 text-blue-500"
            />
            <label className="ml-2">{placeholder}</label>
          </div>
        );

      default:
        return <input type="text" className={baseClass} />;
    }
  };

  return (
    <div className="mb-1 px-2">
      {renderField()}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default RenderInput;
