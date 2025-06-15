import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { FieldError, useForm } from 'react-hook-form';
import RenderInput from '../../../../components/RenderInput/RenderInput';
import * as yup from "yup";
import { useAddUnitOfMeasurementHook } from '../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook';
import { IoClose } from 'react-icons/io5';
import { FiCamera } from 'react-icons/fi';


const validationSchema = yup.object().shape({
  // areaDetail: yup.string().required("Area Detail is required"),
  // areaShortName: yup.string().required("Area Short name is required"),
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
      name: "unitCategory",
      type: "autoCompleteSelectFeild",
      placeholder: "Enter customer name",
      label: "Unit Category",
      required: true,
      gridClass: "col-span-1",
    },
    {
      name: "unitCategory",
      type: "text",
      placeholder: "Enter customer name",
      label: "Unit Category",
      required: true,
      gridClass: "col-span-1",
    },
    {
      name: "baseUnit",
      type: "text",
      placeholder: "Enter street",
      label: "Base Unit",
      required: true,
      gridClass: "col-span-1",
    },
    {
      name: "contain",
      type: "text",
      placeholder: "Enter street",
      label: "Contain",
      required: true,
      gridClass: "col-span-1",
    }
  ];

interface UnitOfMeasurementFormProps {
  onClose: () => void;
}

const UnitOfMeasurementForm: React.FC<UnitOfMeasurementFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate } = useAddUnitOfMeasurementHook();

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
      className="grid grid-cols-2 md:grid-cols-4"
    >
      {inputFields.map((field, index) => (
        <div key={index} className={`w-full ${field.gridClass} py-1`}>
          <RenderInput
            name={field.name}
            fieldType={field.type}
            placeholder={field.placeholder}
            label={field.label}
            required={field.required}
            options={field.options}
            register={register}
            error={
              errors[field.name as keyof typeof errors] as
              | FieldError
              | undefined
            }
          />
        </div>
      ))}
      <div className="col-span-2 md:col-span-4 flex justify-between items-center border-t pt-2 border-stone-300">
        <button
          className="flex text-sm items-center gap-2 bg-red-300 transition-colors hover:bg-red-400 px-3 py-1.5 rounded"
          onClick={onClose}
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
  )
}

export default UnitOfMeasurementForm