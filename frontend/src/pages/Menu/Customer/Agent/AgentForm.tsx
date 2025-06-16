import React from 'react'
import RenderInput from '../../../../components/RenderInput/RenderInput'
import { IoClose } from 'react-icons/io5'
import { FiCamera } from 'react-icons/fi'
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddAgentHook } from '../../../../api/customerSupplier/agent/agent-hook';
import { FieldError, useForm } from 'react-hook-form';
import * as yup from "yup";

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
      name: "agentDetail",
      type: "text",
      placeholder: "Enter area detail",
      label: "Area Detail",
      required: true,
      gridClass: "col-span-1 md:col-span-4",
    },
    {
      name: "street",
      type: "text",
      placeholder: "Enter street",
      label: "Street",
      required: true,
      gridClass: "col-span-1 md:col-span-1",
    },
    {
      name: "city",
      type: "text",
      placeholder: "Enter city",
      label: "City",
      required: true,
      gridClass: "col-span-1 md:col-span-1",
    },
    // {
    //   name: "country",
    //   type: "dropdown",
    //   placeholder: "Enter country",
    //   label: "Country",
    //   options: [
    //     { label: "Nepal", value: "Nepal" }
    //   ],
    //   required: true,
    //   gridClass: "col-span-1 md:col-span-1",
    // },
    {
      name: "contactPerson",
      type: "text",
      placeholder: "Enter contact person",
      label: "Contact Person",
      required: true,
      gridClass: "col-span-1 md:col-span-1",
    },
    {
      name: "emailAddress",
      type: "text",
      placeholder: "Enter email address",
      label: "Email",
      required: true,
      gridClass: "col-span-1 md:col-span-1",
    },
    {
      name: "phoneNumber",
      type: "text",
      placeholder: "Enter phone number",
      label: "Phone Number",
      required: true,
      gridClass: "col-span-1 md:col-span-1",
    },
  ];

const AgentForm: React.FC<any> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { mutate } = useAddAgentHook();

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

export default AgentForm