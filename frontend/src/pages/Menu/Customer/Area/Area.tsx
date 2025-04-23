import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import AreaForm from "./AreaFrom";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import Header from "../../../../components/Header/Header";
import { CustomPaginationGetTable } from "../../../../components/CustomPagination/CustomPaginationGetTable";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import { useGetAreaPaginated } from "../../../../api/customerSupplier/area/area-hook";


const Area: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setpageSize] = useState(10);


  const { data: areaData, isLoading } = useGetAreaPaginated({
    pageNumber: pageNumber,
    pageSize: pageSize,
    search: "",
  })

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: nanoid(),
        accessorKey: 'areaShortName',
        header: 'Area',
      },
      {
        id: nanoid(),
        accessorKey: 'areaDetail',
        header: 'Detail',
      },
    ],
    [],
  );


  return (
    <>
      <div>
        <Header
          modelWidth="40%"
          modelTitle="Area"
          buttonTitle="Add Area"
          buttonIcon={<FiPlus />}
          openModel={openModel}
          setOpenModel={setOpenModel}
        >
          <AreaForm onClose={() => setOpenModel(false)} />
        </Header>
      </div>
      <FilterSearch />
      <CustomTable
        columns={columns}
        data={areaData?.areas}
        isLoading={isLoading}
        enableRowNumbers
      />
      <CustomPaginationGetTable
        totalPages={areaData?.pages}
        currentPage={1}
        totalElements={areaData?.totalElements}
        setPageNumber={setPageNumber}
        setpageSize={setpageSize}
      />
    </>
  );
};

export default Area;
