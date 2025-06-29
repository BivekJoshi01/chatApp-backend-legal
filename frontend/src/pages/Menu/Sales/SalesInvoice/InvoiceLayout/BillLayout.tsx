import React, { useState, useEffect } from "react";
import ComLogo from "../../../../../assets/Office/UniversalLogo.jpeg";
import { Input } from "../../../../../components/RenderInput/Fields/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { purchaseRemoveFromCart } from "../../../../../redux/reducer/productPurchaseCart";
import { Delete } from "lucide-react";
import { Button } from "../../../../../components/Button/button";
import { PrintSaleBillLayout } from "../../SalesHelper/PrintSaleBillLayout";
import { getBase64FromImage } from "../../../../../utils/getBase64FromImage";

const BillLayout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.purchaseCart.items);

  const [isVATChecked, setIsVATChecked] = useState(true);
  const [isDISCOUNTChecked, setIsDISCOUNTChecked] = useState(true);
  const [vatPercent, setVatPercent] = useState(13);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);


  const subTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = isVATChecked ? (subTotal * vatPercent) / 100 : 0;
  const discountValue = isDISCOUNTChecked
    ? discountAmount > 0
      ? discountAmount
      : (discountPercent > 0 ? (subTotal * discountPercent) / 100 : 0)
    : 0;

  const grandTotal = subTotal + tax - discountValue;

  const handleRemoveItem = (id: string) => {
    dispatch(purchaseRemoveFromCart(id));
  };

  const handleVATChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setVatPercent(val);
    }
  };

  const handleCheckboxToggle = () => {
    setIsVATChecked((prev) => !prev);
    if (!isVATChecked) {
      // When re-checking, reset VAT to 13 if it was 0
      setVatPercent(13);
    }
  };
  const handleCheckboxDiscountToggle = () => {
    setIsDISCOUNTChecked((prev) => !prev);
    if (!setIsDISCOUNTChecked) {
      setDiscountAmount(0);
      setDiscountPercent(0);
    }
  };

  const handleDiscountAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDiscountAmount(!isNaN(value) ? value : 0);
    setDiscountPercent(0); // disable percent if amount is typed
  };

  const handleDiscountPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setDiscountPercent(!isNaN(value) ? value : 0);
    setDiscountAmount(0); // disable amount if percent is typed
  };


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
    grandTotal
  };

  const htmlContent = PrintSaleBillLayout({ billData, logoBase64 });

  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  }
};

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg text-gray-700">
      {/* Header & Company Info... (same as before) */}
      {/* <div className="flex items-center justify-between">
        <div className="w-28 h-28">
          <img
            src={ComLogo}
            alt="Company Logo"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-800">
            Universal Stationery Suppliers
          </h1>
          <p className="text-gray-600">Balambu 12, Kathmandu, Nepal</p>
          <p className="text-gray-600">Email: universal@stationery.com</p>
          <p className="text-gray-600">Phone: +977-01-5555555</p>
          <p className="text-gray-600">www.universalstationery.com.np</p>
        </div>
      </div> */}

      {/* Divider */}
      {/* <div className="border-t border-gray-300 my-3"></div> */}
      {/* Bill Info */}
      <div className="flex justify-between gap-4 text-sm mb-6">
        <p className="font-medium">Bill No: Q-2025-001</p>
        <p>Date: 2025-02-02</p>
      </div>

      <Input />

      {/* Table */}
      <table className="w-full text-left border-collapse my-2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2">#</th>
            <th className="border border-gray-300 px-3 py-2">Item</th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Unit
            </th>
            <th className="border border-gray-300 px-3 py-2 text-right">Qty</th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Rate (Rs)
            </th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Total (Rs)
            </th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Act.
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-3 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-3 py-2">
                {item.productName}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {item.unit}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {item.price}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {item.totalPrice}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-center">
                <button
                  onClick={() => handleRemoveItem(item.pm_id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <Delete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
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

      {/* Remarks */}
      {/* <div className="mt-4">
        {cartItems?.map((r, index) =>
          r.remarks?.trim() ? (
            <p key={index}>
              {index + 1}. {r.remarks}
            </p>
          ) : null
        )}
      </div> */}
      <Button className="w-full mt-6" onClick={handlePrint}>
        Submit & Print
      </Button>
    </div>
  );
};

export default BillLayout;
