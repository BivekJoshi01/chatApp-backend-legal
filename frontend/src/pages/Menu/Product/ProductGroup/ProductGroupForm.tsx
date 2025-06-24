import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";
import { useAddProductGroupHook } from "../../../../api/product/productGroup/productGroup-hook";
import { useGetAllProductTypesHook } from "../../../../api/product/productType/productType-hook";
import { IoClose } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  shortName: yup.string().required("Short Name is required"),
  typeId: yup.string().required("Product Type is required"),
  description: yup.string().required("Description is required"),
});

interface ProductGroupFormProps {
  onClose: () => void;
}

const ProductGroupForm: React.FC<ProductGroupFormProps> = ({ onClose }) => {
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
      options: productTypes?.map((type: any) => ({
        value: type._id,
        label: type.name,
      })) || [],
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

  const { mutate } = useAddProductGroupHook();

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

export default ProductGroupForm;