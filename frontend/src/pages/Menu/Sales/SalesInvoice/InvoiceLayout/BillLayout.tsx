import React, { useState } from "react";
import ComLogo from "../../../../../assets/Office/UniversalLogo.jpeg";
import { Input } from "../../../../../components/RenderInput/Fields/input";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { Button } from "../../../../../components/Button/button";
import { getBase64FromImage } from "../../../../../utils/getBase64FromImage";
import BillSalesUI from "./BillSalesUI";
import { useForm } from "react-hook-form";
import { useAddSalesRecordHook } from "../../../../../api/buySell/sell/sell-hook";
import { PrintSaleBillLayout } from "../../SalesHelper/PrintSaleBillLayout";
import { PrintableSalesBillLayout } from "../../SalesHelper/PrintableSalesBillLayout";
import CustomerSelect from "./CustomerSelect";

export interface Customer {
  _id: string;
  userId: {
    name: string;
  };
  phoneNumber?: string;
  customerPic?: string;
  isRetailer?: boolean;
}

const BillLayout = () => {
  const cartItems = useSelector((state: RootState) => state.purchaseCart.items);
  const loggedUsersData = useSelector((state: RootState) => state.auth.user);

  const [isVATChecked, setIsVATChecked] = useState(false);
  const [isDISCOUNTChecked, setIsDISCOUNTChecked] = useState(true);
  const [vatPercent, setVatPercent] = useState(13);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const subTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = isVATChecked ? (subTotal * vatPercent) / 100 : 0;
  const discountValue = isDISCOUNTChecked
    ? discountAmount > 0
      ? discountAmount
      : discountPercent > 0
        ? (subTotal * discountPercent) / 100
        : 0
    : 0;
  const grandTotal = subTotal + tax - discountValue;

  const handleVATChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) setVatPercent(val);
  };

  const handleCheckboxToggle = () => {
    setIsVATChecked((prev) => !prev);
    if (!isVATChecked) setVatPercent(13);
  };

  const handleCheckboxDiscountToggle = () => {
    setIsDISCOUNTChecked((prev) => !prev);
    if (!isDISCOUNTChecked) {
      setDiscountAmount(0);
      setDiscountPercent(0);
    }
  };

  const handleDiscountAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    setDiscountAmount(!isNaN(value) ? value : 0);
    setDiscountPercent(0);
  };

  const handleDiscountPercentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    setDiscountPercent(!isNaN(value) ? value : 0);
    setDiscountAmount(0);
  };

  const {
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: addMutate } = useAddSalesRecordHook();

  const handlePrint = async () => {
    const logoBase64 = await getBase64FromImage(ComLogo);

    const billData = {
      cartItems,
      subTotal,
      tax,
      vatPercent,
      isVATChecked,
      discountAmount,
      discountPercent,
      discountValue,
      isDISCOUNTChecked,
      grandTotal,
    };

    const customerName = selectedCustomer?.userId?.name || "";

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
  };

  const handleSubmitPrint = async (formData: any) => {
    const billData = {
      cartItems,
      subTotal,
      tax,
      vatPercent,
      isVATChecked,
      discountAmount,
      discountPercent,
      discountValue,
      isDISCOUNTChecked,
      grandTotal,
    };

    const finalPayload = {
      ...formData,
      ...billData,
      customerId: selectedCustomer?._id || null,
      customerName: selectedCustomer?.userId?.name || null,
    };

    addMutate(finalPayload, {
      onSuccess: () => {
        handlePrint();
        reset();
      },
      onError: (err) => {
        console.error("Error saving:", err);
      },
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg text-gray-700">
        <div className="flex justify-between gap-4 text-sm mb-6">
          <p className="font-medium">Bill No: ....................</p>
          <p>Date: 2025-02-02</p>
        </div>
        <CustomerSelect setSelectedCustomer={setSelectedCustomer} selectedCustomer={selectedCustomer} />
        <BillSalesUI cartItems={cartItems} />
        <div className="flex mb-8">
          <div className="w-full">
            <div className="flex justify-between py-2 border-b border-gray-300">
              <span>Sub Total</span>
              <span>Rs. {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isVATChecked}
                  onChange={handleCheckboxToggle}
                />
                <span>VAT</span>
                <Input
                  type="number"
                  value={vatPercent}
                  onChange={handleVATChange}
                  disabled={!isVATChecked}
                  className="w-15"
                />
                <span>%</span>
              </div>
              <span>Rs. {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-300 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isDISCOUNTChecked}
                  onChange={handleCheckboxDiscountToggle}
                />
                <span>Discount</span>
                <Input
                  type="number"
                  value={discountPercent}
                  onChange={handleDiscountPercentChange}
                  disabled={!isDISCOUNTChecked || discountAmount > 0}
                  className="w-15"
                  placeholder="Amt"
                />
                <span>%</span>
                <Input
                  type="number"
                  value={discountAmount}
                  onChange={handleDiscountAmountChange}
                  disabled={!isDISCOUNTChecked || discountPercent > 0}
                  className="w-20"
                  placeholder="Amt"
                />
                <span>Amt</span>
              </div>
              <span>Rs. {discountValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-gray-800">
              <span>Grand Total</span>
              <span>Rs. {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-6"
          onClick={handleSubmit(handleSubmitPrint)}
        >
          Submit & Print
        </Button>
      </div>
    </>
  );
};

export default BillLayout;
