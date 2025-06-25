import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";
import {
  useAddProductGroupHook,
  useGetProductGroupByIdHook,
  useUpdateProductGroupHook,
} from "../../../../api/product/productGroup/productGroup-hook";
import { useGetAllProductTypesHook } from "../../../../api/product/productType/productType-hook";
import { IoClose } from "react-icons/io5";
import { Button } from "../../../../components/Button/button";
import { Separator } from "../../../../components/ui/separator";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortName: yup.string().required("Short Name is required"),
  typeId: yup.string().required("Product Type is required"),
  description: yup.string().required("Description is required"),
});

interface ProductGroupFormProps {
  selectedRowId?: string;
  onClose: () => void;
}

const ProductGroupForm: React.FC<ProductGroupFormProps> = ({
  selectedRowId,
  onClose,
}) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetProductGroupByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    // watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddProductGroupHook();
  const { mutate: updateMutate, isPending: isUpdating } =
    useUpdateProductGroupHook();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        shortName: data?.shortName ?? "",
        typeId: data?.typeId ?? "",
        description: data.description ?? "",
      });
    } else {
      reset({
        name: "",
        shortName: "",
        typeId: "",
        description: "",
      });
    }
  }, [data, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const { data: productTypes } = useGetAllProductTypesHook();

  const inputFields: InputField[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter product group name",
      label: "Name",
      required: true,
      gridClass: "col-span-4",
    },
    {
      name: "shortName",
      type: "text",
      placeholder: "Enter short name",
      label: "Short Name",
      required: true,
      gridClass: "col-span-4",
    },
    {
      name: "typeId",
      type: "select",
      placeholder: "Select product type",
      label: "Product Type",
      required: true,
      gridClass: "col-span-4",
      options:
        productTypes?.map((type: any) => ({
          value: type._id,
          label: type.name,
        })) || [],
    },
    // {
    //   name: "areaId",
    //   type: "autoCompleteSelectGetRequestField",
    //   apiPath: "api/inventory/productType/getAll",
    //   optionLabel: "areaShortName",
    //   optionValue: "_id",
    //   placeholder: "Select area",
    //   label: "Area",
    //   required: true,
    //   gridClass: "col-span-1",
    // },
    {
      name: "description",
      type: "textarea",
      placeholder: "Enter description",
      label: "Description",
      required: true,
      gridClass: "col-span-4",
    },
  ];

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
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default ProductGroupForm;
