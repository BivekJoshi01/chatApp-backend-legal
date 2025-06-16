import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../../components/Header/Header";
import { FiPlus } from "react-icons/fi";
import UnitOfMeasurementForm from "./UnitOfMeasurementForm";
import { MRT_ColumnDef } from "material-react-table";
import { nanoid } from "@reduxjs/toolkit";
import { useSearchUnitOfMeasurementHook } from "../../../../api/product/unitOfMeasurement/unitOfMeasurement-hook";
import { useForm } from "react-hook-form";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";

const UnitOfMeasurement: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const { mutate, data: unitOfMeasurementData, isPending } = useSearchUnitOfMeasurementHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        accessorKey: "unitCategory",
        header: "unitCategory",
      },
      {
        id: nanoid(),
        accessorKey: "baseUnit",
        header: "baseUnit",
      },
      {
        id: nanoid(),
        accessorKey: "contain",
        header: "contain",
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
    }
  ];

  return (
    <div>
      <Header
        modelWidth="30%"
        modelTitle="Unit Of Measurement"
        buttonTitle="Add Unit of Measurement"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <UnitOfMeasurementForm onClose={() => setOpenModel(false)} />
      </Header>
      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSearch)}
      />
      <CustomTable
        columns={columns}
        data={unitOfMeasurementData?.units || []}
        enableRowNumbers
        isLoading={isPending}
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
    </div>
  );
};

export default UnitOfMeasurement;
