import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../../../components/Header/Header';
import { FiPlus } from 'react-icons/fi';
import { MRT_ColumnDef } from 'material-react-table';
import { nanoid } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import { CustomPaginationSearchTable } from '../../../../components/CustomPagination/CustomPaginationSearchTable';
import FilterSearch from '../../../../components/FilterSearch/FilterSearch';
import { useSearchSupplierHook } from '../../../../api/customerSupplier/supplier/supplier-hook';
import SupplierOtherPartyForm from './SupplierOtherPartyForm';

const SupplierOtherParty: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const { mutate, data: supplierData, isPending } = useSearchSupplierHook();

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
      name: "street",
      type: "text",
      placeholder: "Search by street name",
      label: "Street",
      gridClass: "col-span-4 md:col-span-1",
    }
  ];

  return (
    <>
      <div>
        <Header
          modelWidth="40%"
          modelTitle="Supplier"
          buttonTitle="Add Supplier"
          buttonIcon={<FiPlus />}
          openModel={openModel}
          setOpenModel={setOpenModel}
        >
          <SupplierOtherPartyForm onClose={() => setOpenModel(false)} />
        </Header>
        <FilterSearch
          inputFields={inputFields}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSearch)}
        />

        <CustomTable
          columns={columns}
          data={supplierData?.suppliers || []}
          enableRowNumbers
          isLoading={isPending}
        />
        <CustomPaginationSearchTable
          totalPages={supplierData?.pages}
          currentPage={pagination.pageNumber}
          totalElements={supplierData?.totalElements}
          pageSize={pagination.pageSize}
          onPaginationChange={(updatedPagination) =>
            setPagination(updatedPagination)
          }
        />
      </div>
    </>
  )
}

export default SupplierOtherParty