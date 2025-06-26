import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import { IoClose } from "react-icons/io5";
import {
  useAddSupplierHook,
  useGetSupplierByIdHook,
  useUpdateSupplierHook,
} from "../../../../api/customerSupplier/supplier/supplier-hook";
import { Separator } from "../../../../components/ui/separator";
import { Button } from "../../../../components/Button/button";

const validationSchema = yup.object().shape({
  // areaDetail: yup.string().required("Area Detail is required"),
  // areaShortName: yup.string().required("Area Short name is required"),
});

const inputFields: InputField[] = [
  {
    name: "supplierDetail",
    type: "text",
    placeholder: "Enter supplier name",
    label: "Supplier Name",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "street",
    type: "text",
    placeholder: "Enter street",
    label: "Street",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "city",
    type: "text",
    placeholder: "Enter city",
    label: "City",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "country",
    type: "text",
    placeholder: "Enter country",
    label: "Country",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "vatPan",
    type: "text",
    placeholder: "Enter VAT/PAN",
    label: "VAT/PAN",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "isRegular",
    type: "checkbox",
    label: "Is Retailer?",
    required: false,
    gridClass: "col-span-1",
  },
  {
    name: "contactPerson",
    type: "text",
    placeholder: "Enter contact person",
    label: "Contact Person",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter email",
    label: "Email",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter phone number",
    label: "Phone Number",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "creditLimit",
    type: "number",
    placeholder: "Enter credit limit",
    label: "Credit Limit",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "type",
    type: "text",
    placeholder: "Enter type",
    label: "Supplier Type",
    required: true,
    gridClass: "col-span-1",
  },
  {
    name: "memo",
    type: "text",
    placeholder: "Enter memo",
    label: "Memo",
    required: false,
    gridClass: "col-span-1",
  },
  {
    name: "isActive",
    type: "checkbox",
    label: "Is Active?",
    required: false,
    gridClass: "col-span-1",
  },
];

interface SupplierFormProps {
  selectedRowId?: string;
  onClose: () => void;
}

const SupplierOtherPartyForm: React.FC<SupplierFormProps> = ({
  selectedRowId,
  onClose,
}) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetSupplierByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddSupplierHook();
  const { mutate: updateMutate, isPending: isUpdating } =
    useUpdateSupplierHook();

  useEffect(() => {
    if (data) {
      reset({
        agentDetail: data?.agentDetail ?? "",
        street: data?.street ?? "",
        city: data?.city ?? "",
        country: data?.country ?? "",
        contactPerson: data?.contactPerson ?? "",
        emailAddress: data?.emailAddress ?? "",
        phoneNumber: data.phoneNumber ?? "",
      });
    } else {
      reset({
        agentDetail: "",
        street: "",
        city: "",
        country: "",
        contactPerson: "",
        emailAddress: "",
        phoneNumber: "",
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
        <Button variant="outline" onClick={onClose}>
          <IoClose /> <span>Close</span>
        </Button>
        <Button type="submit" disabled={isSubmitting || isFetching}>
          <span>{id ? "Update" : "Submit"}</span>
        </Button>
      </div>
    </form>
  );
};

export default SupplierOtherPartyForm;
