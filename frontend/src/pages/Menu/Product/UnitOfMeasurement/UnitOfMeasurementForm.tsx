import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";
import { useAddUnitOfMeasurementHook } from "../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook";
import { IoClose } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";

const validationSchema = yup.object().shape({
  unitCategory: yup.string().required("Unit Category is required"),
  baseUnit: yup.string().required("Base Unit is required"),
  contain: yup.string().required("Contain is required"),
});

const inputFields: InputField[] = [
  {
    name: "unitCategory",
    type: "text",
    placeholder: "Enter customer name",
    label: "Unit Category Text",
    required: true,
    gridClass: "col-span-4",
  },
  {
    name: "baseUnit",
    type: "text",
    placeholder: "Enter street",
    label: "Base Unit",
    required: true,
    gridClass: "col-span-4",
  },
  {
    name: "contain",
    type: "text",
    placeholder: "Enter street",
    label: "Contain",
    required: true,
    gridClass: "col-span-4",
  },
];

interface UnitOfMeasurementFormProps {
  onClose: () => void;
}

const UnitOfMeasurementForm: React.FC<UnitOfMeasurementFormProps> = ({
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

export default UnitOfMeasurementForm;
