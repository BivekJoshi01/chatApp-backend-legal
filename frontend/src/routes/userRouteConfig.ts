import { Outlet } from "react-router";

// ---------------------------------Product-----------------------------------------------------------
import ProductManagement from "../pages/Menu/Product/ProductManagement/ProductManagement";
import ProductCompany from "../pages/Menu/Product/ProductCompany/ProductCompany";
import ProductGroup from "../pages/Menu/Product/ProductGroup/ProductGroup";
import UnitOfMeasurement from "../pages/Menu/Product/UnitOfMeasurement/UnitOfMeasurement";
// ---------------------------------Product-----------------------------------------------------------

import Area from "../pages/Menu/Customer/Area/Area";
import Agent from "../pages/Menu/Customer/Agent/Agent";
import Customer from "../pages/Menu/Customer/Customer/Customer";
import SupplierOtherParty from "../pages/Menu/Customer/SupplierOtherParty/SupplierOtherParty";
import UserLandingPage from "../pages/User/UserLandingPage";

export const UserRoutesConfig = [
  {
    path: "User",
    element: Outlet,
    headChildren: [
      {
        path: "Home",
        element: UserLandingPage,
        Children: [],
      },
      {
        path: "Customer/Suppliers",
        element: Outlet,
        children: [
          { path: "Supplier/ Other Party", element: SupplierOtherParty },
          { path: "Customer", element: Customer },
          { path: "Area", element: Area },
          { path: "Agent", element: Agent },
        ],
      },
      {
        path: "Product",
        element: Outlet,
        children: [
          { path: "Product Management", element: ProductManagement },
          { path: "Product Company", element: ProductCompany },
          { path: "Product Group", element: ProductGroup },
          { path: "Unit of Measurement", element: UnitOfMeasurement },
        ],
      }
    ],
  },
];
