import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import {
  useAddProductManagementHook,
  useGetProductManagementByIdHook,
  useUpdateProductManagementHook,
} from "../../../../api/product/productManagement/productManagement-hook";
import { useGetAllSuppliersHook } from "../../../../api/customerSupplier/supplier/supplier-hook";
import { useGetAllProductCompaniesHook } from "../../../../api/product/productCompany/productCompany-hook";
import { useGetAllProductGroupsHook } from "../../../../api/product/productGroup/productGroup-hook";
import { useGetAllUnitOfMeasurementHook } from "../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook";
import ProductManagementFields, { productManagemetSchema } from "./ProductManagementFeilds";
import { Button } from "../../../../components/Button/button";
import { Separator } from "../../../../components/ui/separator";

interface ProductManagementFormProps {
  selectedRowId?: any;
  onClose: () => void;
}

const ProductManagementForm: React.FC<ProductManagementFormProps> = ({
  selectedRowId,
  onClose,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<any>({
    resolver: yupResolver(productManagemetSchema),
    defaultValues: {
      stockQuantity: 0,
      minStockLevel: 0,
      maxStockLevel: 0,
      discountPercent: 0,
      hasExpiryDate: false,
      requireAdditionalInfo: false,
      isActive: true,
      isFeatured: false,
    },
  });

  const requireAdditionalInfo = watch("requireAdditionalInfo");
  const hasExpiryDate = watch("hasExpiryDate");
  const id = selectedRowId ?? "";

  const { data, isLoading: isFetching } = useGetProductManagementByIdHook(id as any);
  const { mutate: addmutate, isPending: isAdding } = useAddProductManagementHook();
  const { mutate: updatemutate, isPending: isUpdating } = useUpdateProductManagementHook();
  const { data: unitOfMeasurements } = useGetAllUnitOfMeasurementHook();
  const { data: productGroups } = useGetAllProductGroupsHook();
  const { data: productCompanies } = useGetAllProductCompaniesHook();
  const { data: suppliers } = useGetAllSuppliersHook();

  useEffect(() => {
    if (data) {
      reset({
        productName: data.productName ?? "",
        description: data.description ?? "",
        purchasePrice: data.purchasePrice ?? 0,
        salePrice: data.salePrice ?? 0,
        discountPercent: data.discountPercent ?? 0,
        stockQuantity: data.stockQuantity ?? 0,
        minStockLevel: data.minStockLevel ?? 0,
        maxStockLevel: data.maxStockLevel ?? 0,
        weight: data.weight ?? 0,
        dimensions: data.dimensions ?? { length: 0, width: 0, height: 0 },
        productGroup: data.productGroup ?? "",
        productCompany: data.productCompany ?? "",
        supplier: data.supplier ?? "",
        hasExpiryDate: data.hasExpiryDate ?? false,
        expiryDate: data.expiryDate ?? "",
        batchNumber: data.batchNumber ?? "",
        requireAdditionalInfo: data.requireAdditionalInfo ?? false,
        warehouseLocation: data.warehouseLocation ?? "",
        hsnCode: data.hsnCode ?? "",
        isActive: data.isActive ?? false,
        isFeatured: data.isFeatured ?? false,
      } as any);
    }
  }, [data, reset]);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const conditionalFields: any[] = [];

  if (requireAdditionalInfo) {
    conditionalFields.push(
      {
        name: "weight",
        type: "number",
        label: "Weight",
        placeholder: "Enter weight",
        gridClass: "col-span-3",
      },
      {
        name: "dimensions.length",
        type: "number",
        label: "Length",
        placeholder: "Enter length",
        gridClass: "col-span-3",
      },
      {
        name: "dimensions.width",
        type: "number",
        label: "Width",
        placeholder: "Enter width",
        gridClass: "col-span-3",
      },
      {
        name: "dimensions.height",
        type: "number",
        label: "Height",
        placeholder: "Enter height",
        gridClass: "col-span-3",
      },
      {
        name: "supplier",
        type: "select",
        label: "Supplier",
        placeholder: "Select supplier",
        gridClass: "col-span-4",
        options: suppliers?.map((s: any) => ({ value: s._id, label: s.supplierDetail })) || [],
      },
      {
        name: "hasExpiryDate",
        type: "checkbox",
        label: "Has Expiry Date",
        gridClass: "col-span-4",
      },
      {
        name: "warehouseLocation",
        type: "text",
        label: "Warehouse Location",
        placeholder: "Enter warehouse location",
        gridClass: "col-span-4",
      },
      {
        name: "hsnCode",
        type: "text",
        label: "HSN Code",
        placeholder: "Enter HSN Code",
        gridClass: "col-span-4",
      }
    );
  }

  if (hasExpiryDate) {
    conditionalFields.push(
      {
        name: "expiryDate",
        type: "date",
        label: "Expiry Date",
        placeholder: "Select expiry date",
        gridClass: "col-span-4",
      },
      {
        name: "batchNumber",
        type: "text",
        label: "Batch Number",
        placeholder: "Enter batch number",
        gridClass: "col-span-4",
      }
    );
  }

  const inputFields: any[] = [
    {
      name: "productName",
      type: "text",
      label: "Product Name",
      placeholder: "Enter product name",
      required: true,
      gridClass: "col-span-12",
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter product description",
      required: true,
      gridClass: "col-span-12",
    },
    {
      name: "productGroup",
      type: "select",
      label: "Product Group",
      placeholder: "Select product group",
      gridClass: "col-span-6",
      options: productGroups?.map((g: any) => ({ value: g._id, label: g.name })) || [],
    },
    {
      name: "productCompany",
      type: "select",
      label: "Product Company",
      placeholder: "Select product company",
      gridClass: "col-span-6",
      options: productCompanies?.map((c: any) => ({ value: c._id, label: c.name })) || [],
    },
    {
      name: "purchasePrice",
      type: "number",
      label: "Purchase Price",
      placeholder: "Enter purchase price",
      required: true,
      gridClass: "col-span-4",
    },
    {
      name: "salePrice",
      type: "number",
      label: "Sale Price",
      placeholder: "Enter sale price",
      required: true,
      gridClass: "col-span-4",
    },
    {
      name: "perUnitPrice",
      type: "number",
      label: "Per Unit Price",
      placeholder: "Enter per unit price",
      gridClass: "col-span-4",
    },
    {
      name: "unitOfMeasurement",
      type: "select",
      label: "Unit of Measurement",
      placeholder: "Select unit of measurement",
      gridClass: "col-span-4",
      options: unitOfMeasurements?.map((u: any) => ({ value: u._id, label: u.baseUnit })) || [],
    },
    {
      name: "stockQuantity",
      type: "number",
      label: "Stock Quantity",
      placeholder: "Enter stock quantity",
      gridClass: "col-span-4",
    },
    {
      name: "minStockLevel",
      type: "number",
      label: "Min Stock Level",
      placeholder: "Enter minimum stock level",
      gridClass: "col-span-4",
    },
    {
      name: "maxStockLevel",
      type: "number",
      label: "Max Stock Level",
      placeholder: "Enter maximum stock level",
      gridClass: "col-span-4",
    },
    {
      name: "requireAdditionalInfo",
      type: "checkbox",
      label: "Require Additional Info",
      gridClass: "col-span-12",
    },
    ...conditionalFields,
    // {
    //   name: "isActive",
    //   type: "checkbox",
    //   label: "Is Active",
    //   gridClass: "col-span-4",
    // },
    // {
    //   name: "isFeatured",
    //   type: "checkbox",
    //   label: "Is Featured",
    //   gridClass: "col-span-4",
    // },
  ];

  const onSubmit: SubmitHandler<any> = (formData: any) => {
    if (id) {
      updatemutate({ id, formData }, { onSuccess: handleClose });
    } else {
      addmutate({ formData }, { onSuccess: handleClose });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-12 gap-2"
    >
      <ProductManagementFields
        inputFields={inputFields}
        register={register}
        errors={errors as any}
        control={control}
      />
      <div className="col-span-12">
        <Separator className="my-2" />

        <div className="flex justify-end gap-2.5">
          <Button variant="outline" onClick={onClose}>
            <IoClose /> <span>Close</span>
          </Button>
          <Button type="submit" /* disabled={isSubmitting || isFetching} */>
            <span>{id ? "Update" : "Submit"}</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductManagementForm;
