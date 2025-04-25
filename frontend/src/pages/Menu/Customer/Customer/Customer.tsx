import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../../../components/Header/Header';
import { FiPlus } from 'react-icons/fi';
import CustomerForm from './CustomerForm';
import { MRT_ColumnDef } from 'material-react-table';
import { nanoid } from '@reduxjs/toolkit';
import { useSearchCustomerHook } from '../../../../api/customerSupplier/customer/customer-hook';
import { useForm } from 'react-hook-form';
import CustomTable from '../../../../components/CustomTable/CustomTable';
import { CustomPaginationSearchTable } from '../../../../components/CustomPagination/CustomPaginationSearchTable';
import FilterSearch from '../../../../components/FilterSearch/FilterSearch';

const Customer: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const { mutate, data: customerData, isPending } = useSearchCustomerHook();

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
          modelTitle="Customer"
          buttonTitle="Add Customer"
          buttonIcon={<FiPlus />}
          openModel={openModel}
          setOpenModel={setOpenModel}
        >
          <CustomerForm onClose={() => setOpenModel(false)} />
        </Header>
        <FilterSearch
          inputFields={inputFields}
          register={register}
          errors={errors}
          onSubmit={handleSubmit(onSearch)}
        />
        <CustomTable
          columns={columns}
          data={customerData?.customers || []}
          enableRowNumbers
          isLoading={isPending}
        />
        <CustomPaginationSearchTable
          totalPages={customerData?.pages}
          currentPage={pagination.pageNumber}
          totalElements={customerData?.totalElements}
          pageSize={pagination.pageSize}
          onPaginationChange={(updatedPagination) =>
            setPagination(updatedPagination)
          }
        />
      </div>
    </>
  )
}

export default Customer