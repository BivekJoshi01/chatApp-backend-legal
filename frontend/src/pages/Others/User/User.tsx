import React, { useMemo } from 'react'
import Header from '../../../components/Header/Header'
import CustomTable from '../../../components/CustomTable/CustomTable'
import { MRT_ColumnDef } from 'material-react-table';
import { nanoid } from '@reduxjs/toolkit';
import { useGetAllUser } from '../../../api/auth/auth-hook';

type UserData = {
    // name: {
    //     firstName: string;
    //     lastName: string;
    // };
    // address: string;
};


const User: React.FC = () => {

    const { data, isPending } = useGetAllUser();


    const columns = useMemo<MRT_ColumnDef<UserData>[]>(
        () => [
            {
                id: nanoid(),
                accessorKey: 'name', //access nested data with dot notation
                header: 'Name',
            },
            {
                id: nanoid(),
                accessorKey: 'email',
                header: 'Email',
            },
            {
                id: nanoid(),
                accessorKey: 'address', //normal accessorKey
                header: 'Address',
            },
        ],
        [],
    );

    return (
        <div>
            <Header
                modelTitle="Product Company"
            >
                <></>
            </Header>
            <CustomTable
                columns={columns}
                data={data?.users}
                isLoading={isPending}
                enableRowNumbers
            />
        </div>
    )
}

export default User