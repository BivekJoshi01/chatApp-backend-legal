import React, { useState } from "react";
import Header from "../../../../components/Header/Header";
import { FiPlus } from "react-icons/fi";

const PurchaseInvoice: React.FC = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div>
      <Header
        modelTitle="Invoice"
        buttonTitle="Add Invoice"
        buttonIcon={<FiPlus />}
        openModel={openModel}
        setOpenModel={setOpenModel}
      >
        <></>
      </Header>
    </div>
  );
};

export default PurchaseInvoice;
