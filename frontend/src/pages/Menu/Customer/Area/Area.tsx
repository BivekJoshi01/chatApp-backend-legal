import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import AreaForm from "./AreaFrom";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import Header from "../../../../components/Header/Header";
import { CustomPaginationGetTable } from "../../../../components/CustomPagination/CustomPaginationGetTable";
import { useGetAreaPaginated } from "../../../../api/customerSupplier/area/area-hook";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";

const Area: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setpageSize] = useState(10);

  const { data: areaData, isLoading } = useGetAreaPaginated({
    pageNumber: pageNumber,
    pageSize: pageSize,
    search: "",
  });

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: nanoid(),
        accessorKey: "areaShortName",
        header: "Area",
      },
      {
        id: nanoid(),
        accessorKey: "areaDetail",
        header: "Detail",
      },
    ],
    []
  );

  const handleDelete = (row: any) => {
    setOpenDeleteModel(true);
  };

  const handleEdit = (row: any) => {
    setEditData(row?.original); // Save selected row data
    setOpenEditModel(true);     // Open edit form
  };

  return (
    <>
      <div>
        <Header
          modelTitle="Area"
          buttonTitle="Add Area"
          buttonIcon={<FiPlus />}
          openModel={openModel}
          setOpenModel={setOpenModel}
        >
          <AreaForm onClose={() => setOpenModel(false)} />
        </Header>
      </div>

      <CustomTable
        columns={columns}
        data={areaData?.areas}
        isLoading={isLoading}
        enableRowNumbers
        enableColumnActions
        enableEditing={true}
        enableRowActions={true}
        enableEdit={true}
        enableDelete={true}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <CustomPaginationGetTable
        totalPages={areaData?.pages}
        currentPage={pageNumber}
        totalElements={areaData?.totalElements}
        setPageNumber={setPageNumber}
        setpageSize={setpageSize}
      />

      {/* <FormModel open={openEditModel} width={"20%"} modelTitle={"Edit Area"}>
        <AreaForm
          onClose={() => {
            setOpenEditModel(false);
            setEditData(null);
          }}
          defaultValues={editData}
        />
      </FormModel> */}

      <DeleteConfirmationModel
        open={openDeleteModel}
        close={() => setOpenDeleteModel(false)}
      />
    </>
  );
};

export default Area;
