import React from "react";
import Header from "../../../../components/Header/Header";
import HorizontalButtonCarousel from "./HorizontalButtonCarousel";
import { Input } from "../../../../components/RenderInput/Fields/input";

const SalesInvoice: React.FC = () => {
  return (
    <>
      <Header>
        <></>
      </Header>

      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-7 bg-background">
          <HorizontalButtonCarousel />
          <div className="bg-foreground p-2">
            <Input />
          </div>
          <div className="space-y-4 p-2"></div>
        </div>

        <div className="col-span-3 border border-gray-200">
          <p className="text-gray-600">
            <strong>Product:</strong> Product 1
          </p>
          <p className="text-gray-600">
            <strong>Quantity:</strong> 2
          </p>
          <p className="text-gray-600">
            <strong>Price:</strong> $50.00
          </p>
        </div>
      </div>
    </>
  );
};

export default SalesInvoice;
