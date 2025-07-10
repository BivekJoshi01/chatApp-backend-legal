import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../../../components/Header/Header";
import { useSearchSalesHook } from "../../../../api/buySell/sell/sell-hook";
import { MRT_ColumnDef } from "material-react-table";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import { useForm } from "react-hook-form";
import FilterSearch from "../../../../components/FilterSearch/FilterSearch";
import { getBase64FromImage } from "../../../../utils/getBase64FromImage";
import ComLogo from "../../../../assets/Office/UniversalLogo.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { PrintSaleBillLayout } from "../SalesHelper/PrintSaleBillLayout";
import { PrintableSalesBillLayout } from "../SalesHelper/PrintableSalesBillLayout";

const Sale = () => {
  const loggedUsersData = useSelector((state: RootState) => state.auth.user);

  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { mutate, data: salesData, isPending } = useSearchSalesHook();

  const isFirstRender = useRef(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSearch = (formData: any) => {
    // setSearchKeyword(formData);
    mutate({ formData: { ...formData, ...pagination } });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mutate({ formData: { ...pagination } });
  }, [pagination]);

  const handlePrint = async (row: any) => {
    const logoBase64 = await getBase64FromImage(ComLogo);
    const { customerName } = row?.original;
    const billData = row?.original;
    const htmlContent =
      loggedUsersData?.role !== "SALES"
        ? PrintSaleBillLayout({ billData, logoBase64, customerName })
        : PrintableSalesBillLayout({ billData, logoBase64, customerName });

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();

      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          document.body.removeChild(iframe);
        }, 100);
      };
    }
  }

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "customerName",
        header: "Customer",
        Cell: ({ row }) => {
          const { customerId } = row?.original;
          return (
            <div className="flex flex-col">
              <div>{customerId?.userId?.name}</div>
              <div>{customerId?.userId?.email}</div>
              <div>{customerId?.phoneNumber}</div>
            </div>
          )
        },
      },
      {
        accessorKey: "subTotal",
        header: "Sub Total",
        Cell: ({ row }) => `Rs. ${row.original.subTotal?.toFixed(2)}`,
      },
      {
        header: "Discount",
        Cell: ({ row }) => {
          const {
            isDISCOUNTChecked,
            discountPercent,
            discountAmount,
            discountValue,
          } = row.original;

          if (!isDISCOUNTChecked) return <span>-</span>;

          return (
            <div className="text-sm">
              {discountPercent > 0 && (
                <div>{discountPercent}% → Rs. {discountValue?.toFixed(2)}</div>
              )}
              {discountAmount > 0 && (
                <div>Flat → Rs. {discountValue?.toFixed(2)}</div>
              )}
            </div>
          );
        },
      },
      {
        header: "VAT",
        Cell: ({ row }) => {
          const { isVATChecked, vatPercent, tax } = row.original;

          if (!isVATChecked) return <span>-</span>;

          return (
            <div className="text-sm">
              <div>{vatPercent}%</div>
              <div>Rs. {tax?.toFixed(2)}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "grandTotal",
        header: "Grand Total",
        Cell: ({ row }) => `Rs. ${row.original.grandTotal?.toFixed(2)}`,
      },
      {
        header: "Receipt",
        Cell: ({ row }) => {
          return (
            <div onClick={() => handlePrint(row)}>
              View
            </div>
          )
        },
      },
    ],
    []
  );


  return (
    <>
      <Header>
        <></>
      </Header>

      <FilterSearch
        inputFields={[]}
        register={register}
        errors={errors}
        control={control}
        onSubmit={handleSubmit(onSearch)}
      />

      <CustomTable
        columns={columns}
        data={salesData?.sales || []}
        enableRowNumbers
        isLoading={isPending}
        enableColumnActions
        enableEditing={true}
        enableRowActions={true}
        enableEdit={true}
        enableDelete={true}
        // handleDelete={handleDelete}
        // handleEdit={handleEdit}
        enableExpand={true}
        renderRowSubComponent={(row: any) => {
          const cartItems = row?.cartItems ?? [];

          return (
            <div className="w-full">
              {cartItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">#</th>
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Unit</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Total Price</th>
                        <th className="px-4 py-2 text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item: any, index: any) => (
                        <tr
                          key={item._id}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.productName}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">{item.unit}</td>
                          <td className="px-4 py-2">Rs. {item.price.toLocaleString()}</td>
                          <td className="px-4 py-2">
                            Rs. {item.totalPrice.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">{item.remarks || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No items found.</p>
              )}
            </div>
          );
        }}

      />
      <CustomPaginationSearchTable
        totalPages={salesData?.pages}
        currentPage={pagination.pageNumber}
        totalElements={salesData?.totalElements}
        pageSize={pagination.pageSize}
        onPaginationChange={(updatedPagination) =>
          setPagination(updatedPagination)
        }
      />
    </>
  );
};

export default Sale;
