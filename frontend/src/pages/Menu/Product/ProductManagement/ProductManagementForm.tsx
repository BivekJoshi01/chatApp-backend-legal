import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";
import { useAddProductManagementHook } from "../../../../api/product/productManagement/productManagement-hook";
import { IoClose } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";

const validationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  description: yup.string().required("Description is required"),
});

const inputFields: InputField[] = [
  {
    name: "productName",
    type: "text",
    placeholder: "Enter product name",
    label: "Product Name",
    required: true,
    gridClass: "col-span-4",
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Enter product description",
    label: "Description",
    required: true,
    gridClass: "col-span-4",
  },
];

interface ProductManagementFormProps {
  onClose: () => void;
}

const ProductManagementForm: React.FC<ProductManagementFormProps> = ({
  onClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const watchedValues = watch();
  console.log("🚀 ~ watchedValues:", watchedValues);

  const { mutate } = useAddProductManagementHook();

  const onSubmit = (data: object) => {
    mutate(
      { formData: data },
      {
        onSuccess: () => onClose(),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RenderInput
        inputFields={inputFields}
        register={register}
        errors={errors}
        control={control}
      />

      <div className="col-span-2 md:col-span-4 flex justify-between items-center border-t pt-2 border-stone-300">
        <button
          type="button"
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
  );
};

export default ProductManagementForm;