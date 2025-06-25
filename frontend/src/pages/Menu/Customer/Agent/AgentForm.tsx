import React, { useCallback, useEffect } from 'react'
import RenderInput, { InputField } from '../../../../components/RenderInput/RenderInput'
import { IoClose } from 'react-icons/io5'
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddAgentHook, useGetAgentByIdHook, useUpdateAgentHook } from '../../../../api/customerSupplier/agent/agent-hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from "yup";
import { Separator } from '../../../../components/ui/separator';
import { Button } from '../../../../components/Button/button';

const validationSchema = yup.object().shape({
  // areaDetail: yup.string().required("Area Detail is required"),
  // areaShortName: yup.string().required("Area Short name is required"),
});

const inputFields: InputField[] = [
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
  {
    name: "country",
    type: "dropdown",
    placeholder: "Enter country",
    label: "Country",
    options: [
      { label: "Nepal", value: "Nepal" }
    ],
    required: true,
    gridClass: "col-span-1 md:col-span-1",
  },
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


const AgentForm: React.FC<any> = ({ selectedRowId, onClose }) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetAgentByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddAgentHook();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateAgentHook();

  useEffect(() => {
    if (data) {
      reset({
        agentDetail: data.agentDetail ?? "",
        street: data.street ?? "",
        city: data.city ?? "",
        country: data.country ?? "",
        contactPerson: data?.contactPerson ?? "",
        emailAddress: data?.emailAddress ?? "",
        phoneNumber: data?.phoneNumber ?? "",
      });
    } else {
      reset({
        agentDetail: "",
        street: "",
        city:"",
        country:"",
        contactPerson:"",
        emailAddress:"",
        phoneNumber:""
      });
    }
  }, [data, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit: SubmitHandler<any> = (formData) => {
    if (id) {
      updateMutate(
        { id, formData },
        {
          onSuccess: handleClose,
        }
      );
    } else {
      addMutate(
        { formData },
        {
          onSuccess: handleClose,
        }
      );
    }
  };
  const isSubmitting = isAdding || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <RenderInput
        inputFields={inputFields}
        register={register}
        errors={errors}
        control={control}
      />

      <Separator className="my-2" />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="outline"
          onClick={onClose}
        >
          <IoClose /> <span>Close</span>
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting || isFetching}
        >
          <span>{id ? "Update" : "Submit"}</span>
        </Button>
      </div>
    </form>
  )
}

export default AgentForm