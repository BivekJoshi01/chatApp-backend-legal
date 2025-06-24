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
        modelTitle="Product Company"
        buttonTitle="Add Product Company"
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
