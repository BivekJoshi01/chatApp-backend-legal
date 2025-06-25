import React, { useEffect, useCallback } from "react";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RenderInput, { InputField } from "../../../../components/RenderInput/RenderInput";
import {
  useAddProductTypeHook,
  useUpdateProductTypeHook,
  useGetProductTypeByIdHook,
} from "../../../../api/product/productType/productType-hook";
import { IoClose } from "react-icons/io5";
import { Button } from "../../../../components/Button/button";
import { Separator } from "../../../../components/ui/separator";

interface ProductTypeFormProps {
  selectedRowId?: string;
  onClose: () => void;
}

interface FormValues {
  name: string;
  description: string;
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

const inputFields: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter product type name",
    label: "Name",
    required: true,
    gridClass: "col-span-4",
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Enter description",
    label: "Description",
    required: true,
    gridClass: "col-span-4",
  },
];

const ProductTypeForm: React.FC<ProductTypeFormProps> = ({ selectedRowId, onClose }) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetProductTypeByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddProductTypeHook();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateProductTypeHook();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        description: data.description ?? "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [data, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
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
  );
};

export default ProductTypeForm;
