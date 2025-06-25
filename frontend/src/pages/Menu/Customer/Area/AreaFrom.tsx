import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import { IoClose } from "react-icons/io5";
import { useAddAreaHook, useGetAreaByIdHook, useUpdateAreaHook } from "../../../../api/customerSupplier/area/area-hook";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/Button/button";

const validationSchema = yup.object().shape({
  areaDetail: yup.string().required("Area Detail is required"),
  areaShortName: yup.string().required("Area Short name is required"),
});

const inputFields: InputField[] = [
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
  selectedRowId?: string;
}

const AreaForm: React.FC<AreaFormProps> = ({ selectedRowId, onClose }) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetAreaByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddAreaHook();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateAreaHook();

  useEffect(() => {
    if (data) {
      reset({
        areaDetail: data.areaDetail ?? "",
        areaShortName: data.areaShortName ?? "",
      });
    } else {
      reset({
        areaDetail: "",
        areaShortName: "",
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

export default AreaForm;
