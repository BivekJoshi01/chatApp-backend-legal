import React, { useEffect, useState } from "react";
import { Input } from "../../../../../components/RenderInput/Fields/input";
import { useSearchCustomerHook } from "../../../../../api/customerSupplier/customer/customer-hook";

export interface Customer {
  _id: string;
  userId: {
    name: string;
  };
  phoneNumber?: string;
  customerPic?: string;
  isRetailer?: boolean;
}

const CustomerSelect: React.FC<any> = ({ setSelectedCustomer, selectedCustomer }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { mutate, data: customerData, isPending } = useSearchCustomerHook();

  useEffect(() => {
    if (!searchTerm.trim()) return;

    const handler = setTimeout(() => {
      mutate({
        formData: {
          userId: { name: searchTerm },
          pageNumber: 1,
          pageSize: 99999,
        },
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, mutate]);

  const handleSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCustomer(null);
  };

  return (
    <div className="py-2 space-y-4">
      {/* The search input */}
      <Input
        value={selectedCustomer?.userId?.name ?? searchTerm}
        placeholder="Search customer by name"
        onChange={handleInputChange}
      />

      <div className="space-y-3">
        {selectedCustomer ? (
          <CustomerCard
            customer={selectedCustomer}
            selected
            onSelect={() => {
              setSelectedCustomer(null);
              setSearchTerm("");
            }}
          />
        ) : (
          <>
            {isPending && <div className="text-gray-500">Loading...</div>}
            {!isPending && searchTerm && customerData?.customers?.length === 0 && (
              <div className="text-gray-500">No customers found.</div>
            )}
            {customerData?.customers?.map((customer: Customer) => (
              <CustomerCard
                key={customer._id}
                customer={customer}
                selected={false}
                onSelect={() => handleSelect(customer)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerSelect;

interface CustomerCardProps {
  customer: Customer;
  selected: boolean;
  onSelect: () => void;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, selected, onSelect }) => {
  const name = customer?.userId?.name || "-";
  const phone = customer?.phoneNumber || "-";
  const avatar = customer?.customerPic || "https://via.placeholder.com/40";
  const role = customer?.isRetailer ? "Retailer" : "Wholesaler";

  return (
    <div
      className={`border ${selected ? "border-purple-500 bg-purple-50" : "border-gray-300"
        } rounded p-4 cursor-pointer hover:bg-gray-100 transition`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src={avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="font-medium text-gray-800">{name}</div>
            <div className="text-gray-500 text-sm">{phone}</div>
          </div>
        </div>
        <div className="text-purple-600 font-semibold">{role}</div>
      </div>
    </div>
  );
};
