import React, { useEffect, useState } from "react";
import Header from "../../../../components/Header/Header";
import HorizontalButtonCarousel from "./HorizontalButtonCarousel";
import { useSearchProductManagementsHook } from "../../../../api/product/productManagement/productManagement-hook";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchLayoutSalesFeild from "./SearchLayoutSalesFeild";
import HorizontalProgressLoader from "../../../../components/Loader/HorizontalProgressLoader";
import { CustomPaginationSearchTable } from "../../../../components/CustomPagination/CustomPaginationSearchTable";
import ProductCardUI from "./InvoiceLayout/ProductCardUI";
import BillLayout from "./InvoiceLayout/BillLayout";

const SalesInvoice: React.FC = () => {
  const [selectedProductGroupId, setSelectedProductGroupId] = useState(null);
  const [pagination, setPagination] = useState<any>({
    pageSize: 10,
    pageNumber: 1,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    mutate,
    data: productManagementData,
    isPending,
  } = useSearchProductManagementsHook();

  useEffect(() => {
    mutate({
      formData: {
        ...pagination,
        productGroup: selectedProductGroupId,
      },
    });
  }, [mutate, pagination, selectedProductGroupId]);

  const onSubmit: SubmitHandler<any> = (formData) => {
    mutate({ formData });
  };

  return (
    <>
      <Header>
        <></>
      </Header>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8 bg-background">
          <HorizontalButtonCarousel
            setSelectedProductGroupId={setSelectedProductGroupId}
          />

          <div className="bg-foreground p-2">
            <SearchLayoutSalesFeild
              register={register}
              control={control}
              errors={errors}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
            />
          </div>

          <div className="p-2 grid grid-cols-12 gap-3">
            {isPending ? (
              <HorizontalProgressLoader />
            ) : (
              productManagementData?.productManagements?.map((pm: any) => {
                return (
                  <div className="col-span-4" key={pm._id}>
                    <ProductCardUI pm={pm} />
                  </div>
                );
              })
            )}
          </div>
          <CustomPaginationSearchTable
            totalPages={productManagementData?.pages}
            currentPage={pagination.pageNumber}
            totalElements={productManagementData?.totalElements}
            pageSize={pagination.pageSize}
            onPaginationChange={(updatedPagination) =>
              setPagination(updatedPagination)
            }
          />
        </div>

        <div className="col-span-4 border border-gray-200">
          <BillLayout />
        </div>
      </div>
    </>
  );
};

export default SalesInvoice;
