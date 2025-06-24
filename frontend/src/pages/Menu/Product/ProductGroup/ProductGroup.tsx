import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useSearchProductGroupsHook } from "../../../../api/product/productGroup/productGroup-hook";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import Header from "../../../../components/Header/Header";
import ProductGroupForm from "./ProductGroupForm";

const ProductGroup: React.FC = () => {
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
    data: productGroupData,
    isPending,
  } = useSearchProductGroupsHook();

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
        accessorKey: "name",
        header: "Name",
      },
      {
        id: nanoid(),
        accessorKey: "shortName",
        header: "Short Name",
      },
      {
        id: nanoid(),
        accessorKey: "description",
        header: "Description",
      },
      {
        id: nanoid(),
        accessorKey: "typeId.name",
        header: "Product Type",
      },
    ],
    []
  );

  const inputFields = [
    {
      name: "productGroupName",
      type: "text",
      placeholder: "Search by Group Name",
      label: "productGroupName",
      gridClass: "col-span-4 md:col-span-1",
    },
  ];

  return (
    <>
      <Header
        modelWidth="40%"
        modelTitle="Product Group"
        buttonTitle="Add Product Group"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductGroupForm onClose={() => setOpenModel(false)} />
      </Header>
      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSearch)}
      />
      <CustomTable
        columns={columns}
        data={productGroupData?.productGroups || []}
        enableRowNumbers
        isLoading={isPending}
      />
      <CustomPaginationSearchTable
        totalPages={productGroupData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={productGroupData?.totalElements}
        pageSize={pagination.pageSize}
        onPaginationChange={(updatedPagination) =>
          setPagination(updatedPagination)
        }
      />
    </>
  );
};

export default ProductGroup;
