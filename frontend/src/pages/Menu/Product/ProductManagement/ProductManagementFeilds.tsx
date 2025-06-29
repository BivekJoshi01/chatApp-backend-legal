import React from "react";
import RenderInput, { InputField } from "../../../../components/RenderInput/RenderInput";
import * as yup from "yup";

interface ProductManagementFieldsProps {
  inputFields: InputField[];
  register: any;
  errors: any;
  control: any;
}

export const productManagemetSchema = yup.object().shape({
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
    .max(100, "Discount Percent cannot exceed 100")
    .required("Discount Percent is required"),
  stockQuantity: yup.number().min(0, "Stock Quantity must be at least 0"),
  minStockLevel: yup.number().min(0, "Min Stock Level must be at least 0"),
  maxStockLevel: yup.number().min(0, "Max Stock Level must be at least 0"),
  weight: yup.number().positive("Weight must be positive"),
  expiryDate: yup.date().when("hasExpiryDate", {
    is: true,
    then: (schema) =>
      schema.required("Expiry Date is required when Has Expiry Date is enabled"),
  }),
  batchNumber: yup.string().when("hasExpiryDate", {
    is: true,
    then: (schema) =>
      schema.required("Batch Number is required when Has Expiry Date is enabled"),
  }),
  warehouseLocation: yup.string().when("requireAdditionalInfo", {
    is: true,
    then: (schema) =>
      schema.required(
        "Warehouse Location is required when Require Additional Info is enabled"
      ),
  }),
  hsnCode: yup.string().when("requireAdditionalInfo", {
    is: true,
    then: (schema) =>
      schema.required("HSN Code is required when Require Additional Info is enabled"),
  }),
});


const ProductManagementFields: React.FC<ProductManagementFieldsProps> = ({
  inputFields,
  register,
  errors,
  control,
}) => {
  return (
    <RenderInput
      inputFields={inputFields}
      register={register}
      errors={errors}
      control={control}
    />
  );
};

export default ProductManagementFields;
