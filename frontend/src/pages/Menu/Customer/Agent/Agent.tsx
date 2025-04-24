import React, { useEffect, useState, useMemo } from "react";
import Header from "../../../../components/Header/Header";
import AgentForm from "./AgentForm";
import { FiPlus } from "react-icons/fi";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { useSearchAgentHook } from "../../../../api/customerSupplier/agent/agent-hook";
import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import { useForm } from "react-hook-form";

const Agent: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const { mutate, data: agentData, isPending } = useSearchAgentHook();

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
        accessorKey: "agentDetail",
        header: "Agent",
      },
      {
        id: nanoid(),
        accessorKey: "street",
        header: "Address",
        Cell: ({ row }) => {
          const { city, country, street } = row.original;
          return (
            <div>
              <div>Country: {country}</div>
              <div>City: {city}</div>
              <div>Street: {street}</div>
            </div>
          );
        },
      },
      {
        id: nanoid(),
        header: "Contact",
        Cell: ({ row }) => {
          const { contactPerson, emailAddress, phoneNumber } = row.original;
          return (
            <div>
              <div>Contact Person: {contactPerson}</div>
              <div>Email: {emailAddress}</div>
              <div>Phone Number: {phoneNumber}</div>
            </div>
          );
        },
      },
    ],
    []
  );

  const inputFields = [
    {
      name: "agentDetail",
      type: "text",
      placeholder: "Search by agent",
      label: "Agent",
      gridClass: "col-span-4 md:col-span-1",
    },
    {
      name: "street",
      type: "text",
      placeholder: "Search by street name",
      label: "Street",
      gridClass: "col-span-4 md:col-span-1",
    },
    {
      name: "street",
      type: "text",
      placeholder: "Enter short name",
      label: "Street",
      gridClass: "col-span-4 md:col-span-1",
    },
  ];

  return (
    <>
      <Header
        modelWidth="40%"
        modelTitle="Agent"
        buttonTitle="Add Agent"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <AgentForm onClose={() => setOpenModel(false)} />
      </Header>

      <FilterSearch
        inputFields={inputFields}
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSearch)}
      />

      <CustomTable
        columns={columns}
        data={agentData?.agents || []}
        enableRowNumbers
        isLoading={isPending}
      />

      <CustomPaginationSearchTable
        totalPages={agentData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={agentData?.totalElements}
        pageSize={pagination.pageSize}
        onPaginationChange={(updatedPagination) =>
          setPagination(updatedPagination)
        }
      />
    </>
  );
};

export default Agent;
