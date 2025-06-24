import React, { useState } from "react";
import Header from "../../../../components/Header/Header";
import { FiPlus } from "react-icons/fi";
import ProductManagementForm from "./ProductManagementForm";

const ProductManagement: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div>
      <Header
        modelTitle="Product Company"
        buttonTitle="Add Product Company"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <ProductManagementForm/>
      </Header>
    </div>
  );
};

export default ProductManagement;
