import React, { useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { FiCamera } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useAddAreaHook } from "../../../../api/customerSupplier/area/area-hook";

const validationSchema = yup.object().shape({
  areaDetail: yup.string().required("Area Detail is required"),
  areaShortName: yup.string().required("Area Short name is required"),
});

const inputFields: {
  name: string;
  type: any;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: any;
  error?: FieldError;
  gridClass?: string;
}[] = [
  {
    name: "areaDetail",
    type: "text",
    placeholder: "Enter area detail",
    label: "Area Detail",
    required: true,
    gridClass: "col-span-3 md:col-span-3",
  },
  {
    name: "areaShortName",
    type: "text",
    placeholder: "Enter short name",
    label: "Short Name",
    required: true,
    gridClass: "col-span-3 md:col-span-3",
  },
];

interface AreaFormProps {
  onClose: () => void;
  defaultValues?: {
    areaDetail: string;
    areaShortName: string;
  };
}

const AreaForm: React.FC<AreaFormProps> = ({ onClose, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const { mutate } = useAddAreaHook();

  const onSubmit = (data: object) => {
    mutate(
      { formData: data },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-2 md:grid-cols-3"
    >
      {inputFields.map((field, index) => (
        <div key={index} className={`w-full ${field.gridClass} py-1`}>
          {/* <RenderInput
            name={field.name}
            fieldType={field.type}
            placeholder={field.placeholder}
            label={field.label}
            required={field.required}
            options={field.options}
            register={register}
            error={
              errors[field.name as keyof typeof errors] as FieldError | undefined
            }
          /> */}
        </div>
      ))}
      <div className="col-span-2 md:col-span-3 flex justify-between items-center border-t pt-2 border-stone-300">
        <button
          className="flex text-sm items-center gap-2 bg-red-300 transition-colors hover:bg-red-400 px-3 py-1.5 rounded"
          onClick={onClose}
          type="button"
        >
          <IoClose /> <span>Close</span>
        </button>
        <button
          className="flex text-sm items-center gap-2 bg-green-300 transition-colors hover:bg-green-400 px-3 py-1.5 rounded"
          type="submit"
        >
          <FiCamera /> <span>Submit</span>
        </button>
      </div>
    </form>
  );
};

export default AreaForm;
