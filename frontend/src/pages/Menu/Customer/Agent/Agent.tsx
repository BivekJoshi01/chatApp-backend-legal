import React, { useEffect, useState, useMemo, useRef } from "react";
import Header from "../../../../components/Header/Header";
import AgentForm from "./AgentForm";
import { FiPlus } from "react-icons/fi";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import {
  useDeleteAgentHook,
  useSearchAgentHook,
} from "../../../../api/customerSupplier/agent/agent-hook";
import { MRT_ColumnDef } from "material-react-table";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import { useForm } from "react-hook-form";
import DeleteConfirmationModel from "../../../../components/Model/DeleteConfirmationModel";
import FormModel from "../../../../components/Model/FormModel";

const Agent: React.FC = () => {
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

  const { mutate, data: agentData, isPending } = useSearchAgentHook();

  const { mutate: deleteMutate } = useDeleteAgentHook();

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
        accessorKey: "agentDetail",
        header: "Agent",
      },
      {
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
        modelTitle="Agent"
        buttonTitle="Add Agent"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <AgentForm onClose={() => {
          setOpenModel(false);
          mutate({ formData: { ...searchKeyword, ...pagination } });
        }} />
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
        data={agentData?.agents || []}
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
        totalPages={agentData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={agentData?.totalElements}
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
        <AgentForm
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

export default Agent;
