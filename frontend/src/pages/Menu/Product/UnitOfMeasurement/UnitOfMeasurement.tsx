import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header/Header";
import { FiPlus } from "react-icons/fi";
import UnitOfMeasurementForm from "./UnitOfMeasurementForm";
import { MRT_ColumnDef } from "material-react-table";
import { useDeleteUnitOfMeasurementHook, useSearchUnitOfMeasurementHook } from "../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook";
import { useForm } from "react-hook-form";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";

const UnitOfMeasurement: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });
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
    data: unitOfMeasurementData,
    isPending,
  } = useSearchUnitOfMeasurementHook();

  const { mutate: deleteMutate } = useDeleteUnitOfMeasurementHook()

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
        accessorKey: "unitCategory",
        header: "Category",
      },
      {
        accessorKey: "baseUnit",
        header: "Base Unit",
      },
      {
        accessorKey: "contain",
        header: "Contain",
      },
    ],
    []
  );

  const inputFields = [
    {
      name: "street",
      type: "text",
      placeholder: "Search by street name",
      label: "Street",
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
        modelTitle="Unit Of Measurement"
        buttonTitle="Add Unit of Measurement"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <UnitOfMeasurementForm
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
        data={unitOfMeasurementData?.units || []}
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
        totalPages={unitOfMeasurementData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={unitOfMeasurementData?.totalElements}
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
      <FormModel open={openEditModel} modelTitle="Edit Unit of Measurement">
        <UnitOfMeasurementForm
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

export default UnitOfMeasurement;
