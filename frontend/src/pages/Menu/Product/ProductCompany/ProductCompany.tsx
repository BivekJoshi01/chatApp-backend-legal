import React, { useMemo, useState } from "react";
import Header from "../../../../components/Header/Header";
import ProductCompantForm from "./ProductCompanyForm";
import { FiPlus } from "react-icons/fi";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { nanoid } from "@reduxjs/toolkit";
import { MRT_ColumnDef } from "material-react-table";

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
};

const ProductCompany: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        id:nanoid(),
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        id:nanoid(),
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        id:nanoid(),
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
    ],
    [],
  );

  const data: Person[] = [
    {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      address: '261 Erdman Ford',
    },
    {
      name: {
        firstName: 'Jane',
        lastName: 'Doe',
      },
      address: '769 Dominic Grove',
    },
    {
      name: {
        firstName: 'Joe',
        lastName: 'Doe',
      },
      address: '566 Brakus Inlet',
    },
    {
      name: {
        firstName: 'Kevin',
        lastName: 'Vandy',
      },
      address: '722 Emie Stream',
    },
    {
      name: {
        firstName: 'Joshua',
        lastName: 'Rolluffs',
      },
      address: '32188 Larkin Turnpike',
    },
  ];


  return (
    <>
      <div>
        <Header
          modelTitle="Product Company"
          buttonTitle="Add Product Company"
          buttonIcon={<FiPlus />}
          openModel={openModel}
          setOpenModel={setOpenModel}
        >
          <ProductCompantForm onClose={() => setOpenModel(false)} />
        </Header>
      </div>
      <CustomTable
        columns={columns}
        data={data}
        isLoading={false}
        enableRowNumbers
      />
    </>
  );
};

export default ProductCompany;
