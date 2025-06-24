import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useSearchProductCompaniesHook } from "../../../../api/product/productCompany/productCompany-hook";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import Header from "../../../../components/Header/Header";
import ProductCompantForm from "./ProductCompanyForm";

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

const ProductCompany: React.FC = () => {
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
    data: productCompanyData,
    isPending,
  } = useSearchProductCompaniesHook();

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
        header: "Company Name",
      },
      {
        id: nanoid(),
        accessorKey: "street",
        header: "Street",
      },
      {
        id: nanoid(),
        accessorKey: "city",
        header: "City",
      },
      {
        id: nanoid(),
        accessorKey: "country",
        header: "Country",
      },
      {
        id: nanoid(),
        accessorKey: "contactPerson",
        header: "Contact",
      },
      {
        id: nanoid(),
        accessorKey: "email",
        header: "Email",
      },
      {
        id: nanoid(),
        accessorKey: "phoneNumber",
        header: "phoneNumber",
      },
    ],
    []
  );

  // const data: Person[] = [
  //   {
  //     name: {
  //       firstName: "John",
  //       lastName: "Doe",
  //     },
  //     address: "261 Erdman Ford",
  //   },
  //   {
  //     name: {
  //       firstName: "Jane",
  //       lastName: "Doe",
  //     },
  //     address: "769 Dominic Grove",
  //   },
  //   {
  //     name: {
  //       firstName: "Joe",
  //       lastName: "Doe",
  //     },
  //     address: "566 Brakus Inlet",
  //   },
  //   {
  //     name: {
  //       firstName: "Kevin",
  //       lastName: "Vandy",
  //     },
  //     address: "722 Emie Stream",
  //   },
  //   {
  //     name: {
  //       firstName: "Joshua",
  //       lastName: "Rolluffs",
  //     },
  //     address: "32188 Larkin Turnpike",
  //   },
  // ];

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
        modelTitle="Product Company"
        buttonTitle="Add Product Company"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductCompantForm onClose={() => setOpenModel(false)} />
      </Header>
      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSearch)}
      />
      <CustomTable
        columns={columns}
        data={productCompanyData?.productCompanies || []}
        isLoading={isPending}
        enableRowNumbers
      />
      <CustomPaginationSearchTable
        totalPages={productCompanyData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={productCompanyData?.totalElements}
        pageSize={pagination.pageSize}
        onPaginationChange={(updatedPagination) =>
          setPagination(updatedPagination)
        }
      />
    </>
  );
};

export default ProductCompany;
