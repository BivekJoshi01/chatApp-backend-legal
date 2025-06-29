import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import {
  useDeleteProductManagementHook,
  useSearchProductManagementsHook,
} from "../../../../api/product/productManagement/productManagement-hook";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import Header from "../../../../components/Header/Header";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";
import ProductManagementForm from "./ProductManagementForm";

const ProductManagement: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });
  const [searchKeyword, setSearchKeyword] = useState<Record<string, any>>({});
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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

  const { mutate: deleteMutate } = useDeleteProductManagementHook();

  const onSearch = (formData: any) => {
    setSearchKeyword(formData);
    mutate({ formData: { ...formData, ...pagination } });
  };

  useEffect(() => {
    mutate({ formData: pagination });
  }, [pagination]);
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: nanoid(),
        header: "Product",
        Cell: ({ row }) => {
          const { productName, description } = row.original;
          return (
            <div>
              <b>{productName}</b>
              <div className="text-stone-400">{description}</div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        accessorKey: "productGroup.shortName",
        header: "Group",
      },
      {
        id: nanoid(),
        accessorKey: "productCompany.name",
        header: "productCompany",
      },
      // {
      //   id: nanoid(),
      //   accessorKey: "code",
      //   header: "Product Code",
      // },
      {
        id: nanoid(),
        accessorKey: "unitOfMeasurement.baseUnit",
        header: "Base Unit",
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
        accessorKey: "perUnitPrice",
        header: "Per Unit Price",
      }
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

  const handleDelete = (row: any) => {
    setSelectedItem(row?.original);
    setOpenDeleteModel(true);
  };

  const handleEdit = (row: any) => {
    setSelectedItem(row?.original);
    setOpenEditModel(true);
  };


  return (
    <div>
      <Header
        modelTitle="Add Product"
        buttonTitle="Add Product"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductManagementForm onClose={() => {
          setOpenEditModel(false);
          mutate({ formData: { ...searchKeyword, ...pagination } });
        }} />
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
        enableColumnActions
        enableEditing={true}
        enableRowActions={true}
        enableEdit={true}
        enableDelete={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        enableExpand={true}
        renderRowSubComponent={(row: any) => (
          <div >
            <strong>Extra Info:</strong> {row.extraInfo}
          </div>
        )}
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

      <FormModel open={openEditModel} modelTitle="Edit Product">
        <ProductManagementForm
          selectedRowId={selectedItem?._id}
          onClose={() => {
            setOpenEditModel(false);
            mutate({ formData: { ...searchKeyword, ...pagination } });
          }}
        />
      </FormModel>
    </div>
  );
};

export default ProductManagement;
