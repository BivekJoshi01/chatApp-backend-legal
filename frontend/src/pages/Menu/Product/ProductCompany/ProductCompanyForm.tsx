import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";
import { useAddProductCompanyHook, useGetProductCompanyByIdHook, useUpdateProductCompanyHook } from "../../../../api/product/productCompany/productCompany-hook";
import { IoClose } from "react-icons/io5";
import { Button } from "../../../../components/Button/button";
import { Separator } from "../../../../components/ui/separator";

const validationSchema = yup.object().shape({
  name: yup.string().required("Company name is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  contactPerson: yup.string().required("Contact person is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

const inputFields: InputField[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter company name",
    label: "Company Name",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "street",
    type: "text",
    placeholder: "Enter street address",
    label: "Street",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "city",
    type: "text",
    placeholder: "Enter city",
    label: "City",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "country",
    type: "text",
    placeholder: "Enter country",
    label: "Country",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "contactPerson",
    type: "text",
    placeholder: "Enter contact person name",
    label: "Contact Person",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter email address",
    label: "Email",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
  {
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter phone number",
    label: "Phone Number",
    required: true,
    gridClass: "col-span-2 md:col-span-1",
  },
];

interface ProductCompanyFormProps {
  selectedRowId?: string;
  onClose: () => void;
}

const ProductCompanyForm: React.FC<ProductCompanyFormProps> = ({ selectedRowId, onClose }) => {
  const id = selectedRowId ?? "";
  const { data, isLoading: isFetching } = useGetProductCompanyByIdHook(id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { mutate: addMutate, isPending: isAdding } = useAddProductCompanyHook();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateProductCompanyHook();

  useEffect(() => {
    if (data) {
      reset({
        name: data.name ?? "",
        street: data?.street ?? "",
        city: data?.city ?? "",
        country: data?.country ?? "",
        contactPerson: data?.contactPerson ?? "",
        email: data?.email ?? "",
        phoneNumber: data.phoneNumber ?? "",
      });
    } else {
      reset({
        name: "",
        street: "",
        city: "",
        country: "",
        contactPerson: "",
        email: "",
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

export default ProductCompanyForm;
