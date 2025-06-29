import React from "react";
import { Input } from "../../../../../components/RenderInput/Fields/input";
import { Delete } from "lucide-react";
import { useDispatch } from "react-redux";
import { purchaseRemoveFromCart } from "../../../../../redux/reducer/productPurchaseCart";

type CartItem = {
    pm_id: string;
    productName: string;
    unit: string;
    quantity: number;
    price: number;
    totalPrice: number;
};

type BillSalesUIProps = {
    cartItems?: CartItem[];
};

const BillSalesUI: React.FC<BillSalesUIProps> = ({ cartItems = [] }) => {
    const dispatch = useDispatch();

    const handleRemoveItem = (id: string) => {
        dispatch(purchaseRemoveFromCart(id));
    };

    return (
        <>
            <div className="flex justify-between gap-4 text-sm mb-6">
                <p className="font-medium">Bill No: Q-2025-001</p>
                <p>Date: 2025-02-02</p>
            </div>
            <Input />
            <table className="w-full text-left border-collapse my-2">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-3 py-2">#</th>
                        <th className="border border-gray-300 px-3 py-2">Item</th>
                        <th className="border border-gray-300 px-3 py-2 text-right">
                            Unit
                        </th>
                        <th className="border border-gray-300 px-3 py-2 text-right">
                            Qty
                        </th>
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
                    {cartItems.length === 0 ? (
                        <tr>
                            <td
                                colSpan={7}
                                className="text-center text-gray-500 py-4 border border-gray-300"
                            >
                                No items in the cart.
                            </td>
                        </tr>
                    ) : (
                        cartItems.map((item, index) => (
                            <tr key={item.pm_id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2">
                                    {index + 1}
                                </td>
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
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
};

export default BillSalesUI;
