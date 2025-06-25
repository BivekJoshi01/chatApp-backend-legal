import React from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { AutocompleteSelectField } from "./Fields/autoCompleteSelectFeild";
import { AutocompleteSelectGetRequestField } from "./Fields/autoComplteSelectGetRequestFeild";
import { Input } from "./Fields/input";
import { Label } from "./Fields/label";
import { Select } from "./Fields/select";
import { Textarea } from "./Fields/textarea";

export type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "email"
  | "dropdown"
  | "autoCompleteSelectField"
  | "autoCompleteSelectGetRequestField"
  | "password"
  | "date"
  | "checkbox"
  | "select";

type Option = {
  label?: string;
  value?: string;
};
export interface InputField {
  name: string;
  type: FieldType;
  placeholder?: string;
  label?: string;
  extraLabel?: string;
  required?: boolean;
  gridClass?: string;
  options?: Option[];
  apiPath?: any;
  optionLabel?: string;
  optionValue?: string;
}

interface RenderInputProps {
  inputFields: InputField[];
  register: UseFormRegister<any>;
  control: Control<any>;
  errors?: FieldErrors<any>;
}

export const RenderInput: React.FC<RenderInputProps> = ({
  inputFields,
  register,
  control,
  errors = {},
}) => {
  return (
    <>
      {inputFields?.map((field) => {
        const error = errors[field?.name] as FieldError | undefined;
        const commonProps = {
          ...register(field?.name),
          placeholder: field?.placeholder,
          id: field?.name,
        };

        const renderField = () => {
          switch (field?.type) {
            case "text":
            case "email":
            case "number":
            case "password":
            case "date":
              return <Input type={field?.type} {...commonProps} />;

            case "textarea":
              return <Textarea {...commonProps} />;

            case "autoCompleteSelectField":
              return (
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <AutocompleteSelectField
                      {...controllerField}
                      placeholder={field.placeholder || "Select Option"}
                      options={field.options || []}
                    />
                  )}
                />
              );

            case "autoCompleteSelectGetRequestField":
              return (
                <Controller
                  name={field.name}
                  control={control}
                  defaultValue=""
                  render={({ field: controllerField }) => (
                    <AutocompleteSelectGetRequestField
                      {...controllerField}
                      placeholder={field?.placeholder || "Select Option"}
                      apiPath={field?.apiPath}
                      optionLabel={field?.optionLabel}
                      optionValue={field?.optionValue}
                    />
                  )}
                />
              );

            case "checkbox":
              return (
                <div className="flex items-center gap-2.5">
                  <div>
                    <Label htmlFor={field?.extraLabel}>
                      {field?.extraLabel}
                    </Label>
                  </div>
                  <input
                    type="checkbox"
                    {...register(field?.name)}
                    className="w-4 h-4"
                    id={field?.name}
                  />
                  <label htmlFor={field.name} className="ml-2 text-sm">
                    {field?.placeholder}
                  </label>
                </div>
              );

            case "select":
              return (
                <Select {...commonProps}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              );

            default:
              return <Input type="text" {...commonProps} />;
          }
        };

        return (
          <div
            key={field?.name}
            className={`grid w-full items-start gap-2 px-2 py-2 ${field?.gridClass || ""
              }`}
          >
            {field?.label && (
              <Label htmlFor={field?.name}>
                {field?.label}{" "}
                <p className="text-red-500 text-sm">{field?.required && "*"}</p>
              </Label>
            )}
            {renderField()}
            {error && <p className="text-red-500 text-sm">{error?.message}</p>}
          </div>
        );
      })}
    </>
  );
};

export default RenderInput;
