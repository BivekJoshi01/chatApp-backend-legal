import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FiCamera } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import * as yup from "yup";
import { useAddProductManagementHook } from "../../../../api/product/productManagement/productManagement-hook";

import { useGetAllSuppliersHook } from "../../../../api/customerSupplier/supplier/supplier-hook";
import { useGetAllProductCompaniesHook } from "../../../../api/product/productCompany/productCompany-hook";
import { useGetAllProductGroupsHook } from "../../../../api/product/productGroup/productGroup-hook";
import { useGetAllUnitOfMeasurementHook } from "../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook";
import RenderInput, {
  InputField,
} from "../../../../components/RenderInput/RenderInput";

const validationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  description: yup.string().required("Description is required"),
  purchasePrice: yup
    .number()
    .required("Purchase Price is required")
    .positive("Purchase Price must be positive"),
  salePrice: yup
    .number()
    .required("Sale Price is required")
    .positive("Sale Price must be positive"),
  discountPercent: yup
    .number()
    .min(0, "Discount Percent must be at least 0")
    .max(100, "Discount Percent cannot exceed 100"),
  vatRate: yup.number().min(0, "VAT Rate must be at least 0"),
  stockQuantity: yup.number().min(0, "Stock Quantity must be at least 0"),
  minStockLevel: yup.number().min(0, "Min Stock Level must be at least 0"),
  maxStockLevel: yup.number().min(0, "Max Stock Level must be at least 0"),
  weight: yup.number().positive("Weight must be positive"),
  expiryDate: yup.date().when("hasExpiryDate", {
    is: true,
    then: (schema) =>
      schema.required(
        "Expiry Date is required when Has Expiry Date is enabled"
      ),
  }),
  batchNumber: yup.string().when("hasExpiryDate", {
    is: true,
    then: (schema) =>
      schema.required(
        "Batch Number is required when Has Expiry Date is enabled"
      ),
  }),
  warehouseLocation: yup.string().when("requireAdditionalInfo", {
    is: true,
    then: (schema) =>
      schema.required(
        "Warehouse Location is required when Require Additional Info is enabled"
      ),
  }),
});

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
    defaultValues: {
      vatRate: 0,
      priceIncludeVat: false,
      stockQuantity: 0,
      minStockLevel: 0,
      maxStockLevel: 0,
      hasExpiryDate: false,
      requireAdditionalInfo: false,
      isActive: true,
      isFeatured: false,
    },
  });

  const watchedValues = watch();
  console.log("🚀 ~ watchedValues:", watchedValues);

  const { mutate } = useAddProductManagementHook();

  const { data: unitOfMeasurements } = useGetAllUnitOfMeasurementHook();
  const { data: productGroups } = useGetAllProductGroupsHook();
  const { data: productCompanies } = useGetAllProductCompaniesHook();
  const { data: suppliers } = useGetAllSuppliersHook();

  const inputFields: InputField[] = [
    {
      name: "productName",
      type: "text",
      placeholder: "Enter product name",
      label: "Product Name",
      required: true,
      gridClass: "col-span-2",
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Enter product description",
      label: "Description",
      required: true,
      gridClass: "col-span-4",
    },
    {
      name: "purchasePrice",
      type: "number",
      placeholder: "Enter purchase price",
      label: "Purchase Price",
      required: true,
      gridClass: "col-span-2",
    },
    {
      name: "salePrice",
      type: "number",
      placeholder: "Enter sale price",
      label: "Sale Price",
      required: true,
      gridClass: "col-span-2",
    },
    {
      name: "discountPercent",
      type: "number",
      placeholder: "Enter discount percentage",
      label: "Discount Percent",
      gridClass: "col-span-2",
    },
    {
      name: "vatRate",
      type: "number",
      placeholder: "Enter VAT rate",
      label: "VAT Rate",
      gridClass: "col-span-2",
    },
    {
      name: "stockQuantity",
      type: "number",
      placeholder: "Enter stock quantity",
      label: "Stock Quantity",
      gridClass: "col-span-2",
    },
    {
      name: "minStockLevel",
      type: "number",
      placeholder: "Enter minimum stock level",
      label: "Min Stock Level",
      gridClass: "col-span-2",
    },
    {
      name: "maxStockLevel",
      type: "number",
      placeholder: "Enter maximum stock level",
      label: "Max Stock Level",
      gridClass: "col-span-2",
    },
    {
      name: "unitOfMeasurement",
      type: "select",
      placeholder: "Select unit of measurement",
      label: "Unit of Measurement",
      gridClass: "col-span-2",
      options:
        unitOfMeasurements?.map((unit: any) => ({
          value: unit._id,
          label: unit.baseUnit,
        })) || [],
    },
    {
      name: "weight",
      type: "number",
      placeholder: "Enter weight",
      label: "Weight",
      gridClass: "col-span-2",
    },
    {
      name: "dimensions.length",
      type: "number",
      placeholder: "Enter length",
      label: "Length",
      gridClass: "col-span-1",
    },
    {
      name: "dimensions.width",
      type: "number",
      placeholder: "Enter width",
      label: "Width",
      gridClass: "col-span-1",
    },
    {
      name: "dimensions.height",
      type: "number",
      placeholder: "Enter height",
      label: "Height",
      gridClass: "col-span-2",
    },
    {
      name: "productGroup",
      type: "select",
      placeholder: "Select product group",
      label: "Product Group",
      gridClass: "col-span-2",
      options:
        productGroups?.map((group: any) => ({
          value: group._id,
          label: group.name,
        })) || [],
    },
    {
      name: "productCompany",
      type: "select",
      placeholder: "Select product company",
      label: "Product Company",
      gridClass: "col-span-2",
      options:
        productCompanies?.map((company: any) => ({
          value: company._id,
          label: company.name,
        })) || [],
    },
    {
      name: "supplier",
      type: "select",
      placeholder: "Select supplier",
      label: "Supplier",
      gridClass: "col-span-2",
      options:
        suppliers?.map((supplier: any) => ({
          value: supplier._id,
          label: supplier.supplierDetail,
        })) || [],
    },
    {
      name: "hasExpiryDate",
      type: "checkbox",
      label: "Has Expiry Date",
      gridClass: "col-span-2",
    },
    {
      name: "expiryDate",
      type: "date",
      placeholder: "Select expiry date",
      label: "Expiry Date",
      gridClass: "col-span-2",
    },
    {
      name: "batchNumber",
      type: "text",
      placeholder: "Enter batch number",
      label: "Batch Number",
      gridClass: "col-span-2",
    },
    {
      name: "requireAdditionalInfo",
      type: "checkbox",
      label: "Require Additional Info",
      gridClass: "col-span-2",
    },
    {
      name: "warehouseLocation",
      type: "text",
      placeholder: "Enter warehouse location",
      label: "Warehouse Location",
      gridClass: "col-span-2",
    },
    {
      name: "isActive",
      type: "checkbox",
      label: "Is Active",
      gridClass: "col-span-2",
    },
    {
      name: "isFeatured",
      type: "checkbox",
      label: "Is Featured",
      gridClass: "col-span-2",
    },
    // {
    //   name: "imageUrls",
    //   type: "multipleFileUpload",
    //   label: "Product Images",
    //   gridClass: "col-span-4",
    // },
  ];

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
