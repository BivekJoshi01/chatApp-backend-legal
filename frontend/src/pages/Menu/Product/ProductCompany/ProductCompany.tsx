import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useDeleteProductCompanyHook, useSearchProductCompaniesHook } from "../../../../api/product/productCompany/productCompany-hook";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import Header from "../../../../components/Header/Header";
import ProductCompanyForm from "./ProductCompanyForm";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";

const ProductCompany: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [pagination, setPagination] = useState({ pageSize: 10, pageNumber: 1 });
  const [searchKeyword, setSearchKeyword] = useState<Record<string, any>>({});
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const isFirstRender = useRef(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    mutate,
    data: productCompanyData,
    isPending,
  } = useSearchProductCompaniesHook();

  const { mutate: deleteMutate } = useDeleteProductCompanyHook()

  const onSearch = (formData: any) => {
    setSearchKeyword(formData);
    mutate({ formData: { ...formData, ...pagination } });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mutate({ formData: { ...searchKeyword, ...pagination } });
  }, [pagination]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Company Name",
      },
      {
        accessorKey: "street",
        header: "Street",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        accessorKey: "contactPerson",
        header: "Contact",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phoneNumber",
        header: "phoneNumber",
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

  const handleDelete = (row: any) => {
    setSelectedItem(row?.original);
    setOpenDeleteModel(true);
  };

  const handleEdit = (row: any) => {
    setSelectedItem(row?.original);
    setOpenEditModel(true);
  };

  return (
    <>
      <Header
        modelTitle="Product Company"
        buttonTitle="Add Product Company"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductCompanyForm
          onClose={() => {
            setOpenModel(false);
            mutate({ formData: { ...searchKeyword, ...pagination } });
          }}
        />
      </Header>

      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        control={control}
        onSubmit={handleSubmit(onSearch)}
      />
      <CustomTable
        columns={columns}
        data={productCompanyData?.productCompanies || []}
        enableRowNumbers
        isLoading={isPending}
        enableColumnActions
        enableEditing={true}
        enableRowActions={true}
        enableEdit={true}
        enableDelete={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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

      <DeleteConfirmationModel
        open={openDeleteModel}
        close={() => setOpenDeleteModel(false)}
        onConfirm={() => {
          if (!selectedItem?._id) return;
          deleteMutate(selectedItem?._id, {
            onSuccess: () => {
              mutate({ formData: { ...searchKeyword, ...pagination } });
              setOpenDeleteModel(false);
            },
          });
        }}
      />

      <FormModel open={openEditModel} modelTitle="Edit Product Company">
        <ProductCompanyForm
          selectedRowId={selectedItem?._id}
          onClose={() => {
            setOpenEditModel(false);
            mutate({ formData: { ...searchKeyword, ...pagination } });
          }}
        />
      </FormModel>
    </>
  );
};

export default ProductCompany;
