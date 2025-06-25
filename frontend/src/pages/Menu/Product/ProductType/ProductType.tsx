import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header/Header";
import { FiPlus } from "react-icons/fi";
import ProductTypeForm from "./ProductTypeForm";
import { useForm } from "react-hook-form";
import { useDeleteProductTypeHook, useSearchProductTypesHook } from "../../../../api/product/productType/productType-hook";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";

const ProductType: React.FC = () => {
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
    data: productTypeData,
    isPending,
  } = useSearchProductTypesHook();

  const { mutate: deleteMutate } = useDeleteProductTypeHook()

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
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    []
  );

  const inputFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Search by Group Name",
      label: "Name",
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
        modelTitle="Product Type"
        buttonTitle="Add Product Type"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductTypeForm
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
        data={productTypeData?.productTypes || []}
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
        totalPages={productTypeData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={productTypeData?.totalElements}
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
      <FormModel open={openEditModel} modelTitle="Edit Product Type">
        <ProductTypeForm
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

export default ProductType;
