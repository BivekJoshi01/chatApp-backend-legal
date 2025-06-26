import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useSearchProductManagementsHook } from "../../../../api/product/productManagement/productManagement-hook";
import Header from "../../../../components/Header/Header";
import ProductManagementForm from "./ProductManagementForm";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";

const ProductManagement: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    mutate,
    data: productManagementData,
    isPending,
  } = useSearchProductManagementsHook();

  const onSearch = (formData: any) => {
    mutate({ formData: { ...formData, ...pagination } });
  };

  useEffect(() => {
    mutate({ formData: pagination });
  }, [pagination]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: nanoid(),
        accessorKey: "productName",
        header: "Product Name",
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "Product Description",
      },
      {
        id: nanoid(),
        accessorKey: "code",
        header: "Product Code",
      },
      {
        id: nanoid(),
        accessorKey: "mrp",
        header: "MRP",
      },
      {
        id: nanoid(),
        accessorKey: "purchasePrice",
        header: "Purchase Price",
      },
      {
        id: nanoid(),
        accessorKey: "salePrice",
        header: "Sale Price",
      },
      {
        id: nanoid(),
        accessorKey: "discountPercent",
        header: "Discount %",
      },
      {
        id: nanoid(),
        accessorKey: "vatRate",
        header: "VAT Rate",
      },
      {
        id: nanoid(),
        accessorKey: "stockQuantity",
        header: "Stock Quantity",
      },
      {
        id: nanoid(),
        accessorKey: "minStockLevel",
        header: "minStockLevel",
      },
      {
        id: nanoid(),
        accessorKey: "maxStockLevel",
        header: "maxStockLevel",
      },
      {
        id: nanoid(),
        accessorKey: "unitOfMeasurement.baseUnit",
        header: "Base Unit",
      },
      {
        id: nanoid(),
        accessorKey: "weight",
        header: "Product Weight",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.length",
        header: "Length",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.width",
        header: "Width",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.height",
        header: "Height",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.height",
        header: "Height",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.height",
        header: "Height",
      },
      {
        id: nanoid(),
        accessorKey: "dimensions.height",
        header: "Height",
      },
      {
        id: nanoid(),
        accessorKey: "productGroup.shortName",
        header: "productGroup",
      },
      {
        id: nanoid(),
        accessorKey: "productCompany.name",
        header: "productCompany",
      },
      {
        id: nanoid(),
        accessorKey: "supplier.supplierDetail",
        header: "supplier",
      },
      {
        id: nanoid(),
        accessorKey: "expiryDate",
        header: "Expiry Date",
      },
      {
        id: nanoid(),
        accessorKey: "batchNumber",
        header: "Batch Number",
      },
    ],
    []
  );

  const inputFields = [
    {
      name: "productName",
      type: "text",
      placeholder: "Search by Product Name",
      label: "productName",
      gridClass: "col-span-4 md:col-span-1",
    },
  ];

  return (
    <div>
      <Header
        modelTitle="Add Product"
        buttonTitle="Add Product"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductManagementForm onClose={() => setOpenModel(false)}/>
      </Header>
      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSearch)}
      />
      <CustomTable
        columns={columns}
        data={productManagementData?.productManagements || []}
        enableRowNumbers
        isLoading={isPending}
      />
      <CustomPaginationSearchTable
        totalPages={productManagementData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={productManagementData?.totalElements}
        pageSize={pagination.pageSize}
        onPaginationChange={(updatedPagination) =>
          setPagination(updatedPagination)
        }
      />
    </div>
  );
};

export default ProductManagement;
