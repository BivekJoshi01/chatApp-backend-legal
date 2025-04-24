import { Outlet } from "react-router";

// ---------------------------------Purchase Sales-----------------------------------------------------------
import PurchaseInvoice from "../pages/Menu/Purchase/PurchaseInvoice/PurchaseInvoice";
import SalesInvoice from "../pages/Menu/Sales/SalesInvoice/SalesInvoice";
import SalesReturn from "../pages/Menu/Sales/SalesReturn/SalesReturn";
import PurchaseReturn from "../pages/Menu/Purchase/PurchaseReturn/PurchaseReturn";
// ---------------------------------Purchase Sales-----------------------------------------------------------

// ---------------------------------Product-----------------------------------------------------------
import ProductManagement from "../pages/Menu/Product/ProductManagement/ProductManagement";
import ProductCompany from "../pages/Menu/Product/ProductCompany/ProductCompany";
import ProductGroup from "../pages/Menu/Product/ProductGroup/ProductGroup";
import UnitOfMeasurement from "../pages/Menu/Product/UnitOfMeasurement/UnitOfMeasurement";
// ---------------------------------Product-----------------------------------------------------------

// -----------------------------------Settings-------------------------------------------------------------------------
import Warehouse from "../pages/Setting/WareHouse/Warehouse";
import OpeningStock from "../pages/Setting/OpeningStock/OpeningStock";
import StockEntry from "../pages/Setting/StockEntry/StockEntry";
// -----------------------------------Settings-------------------------------------------------------------------------

import AdminDashboard from "../pages/Menu/Home/Dashbaord/AdminDashboard";
import User from "../pages/Others/User/User";

import Chat from "../pages/Chat/Chat";
import Area from "../pages/Menu/Customer/Area/Area";
import Agent from "../pages/Menu/Customer/Agent/Agent";

export const MenuRoutesConfig = [
  {
    path: "Menu",
    element: Outlet,
    headChildren: [
      {
        path: "Home",
        element: AdminDashboard,
        Children: [],
      },
      {
        path: "Customer/Suppliers",
        element: Outlet,
        children: [
          { path: "Supplier/ Other Party", element: ProductManagement },
          { path: "Customer", element: ProductCompany },
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
          { path: "Product Group", element: Area },
          { path: "Unit of Measurement", element: UnitOfMeasurement },
        ],
      },
      {
        path: "Purchase",
        element: Outlet,
        children: [
          { path: "Invoice", element: PurchaseInvoice },
          { path: "Return", element: PurchaseReturn },
        ],
      },
      {
        path: "Sales",
        element: Outlet,
        children: [
          { path: "Invoice", element: SalesInvoice },
          { path: "Return", element: SalesReturn },
        ],
      },
      {
        path: "Chat",
        element: Chat,
        children: [],
      },
    ],
  },
  {
    path: "Analytics",
    element: Outlet,
    headChildren: [
      {
        path: "Account",
        element: Outlet,
        children: [
          { path: "Day Book", element: ProductManagement },
          { path: "Cash Bank Book", element: ProductCompany },
          { path: "Account Ledge", element: ProductGroup },
          { path: "Account Ledger Summary", element: UnitOfMeasurement },
          { path: "Trial Balance", element: ProductManagement },
          { path: "Trial Balance Periodic", element: ProductManagement },
          { path: "Profit and Loss", element: ProductManagement },
          { path: "Profit ans Loss Periodic", element: ProductManagement },
          { path: "Balance Sheet", element: ProductManagement },
          { path: "Opening Balance", element: ProductManagement },
        ],
      },
      {
        path: "Documents",
        element: Outlet,
        children: [
          { path: "Journal Voucher", element: ProductManagement },
          { path: "Receive Payment Voucher", element: ProductManagement },
          { path: "Debit Note", element: ProductManagement },
          { path: "Credit Note", element: ProductManagement },
        ],
      },
      {
        path: "Chart Of Accounts",
        element: Outlet,
        children: [
          { path: "Account Head", element: ProductManagement },
          { path: "Account Group", element: ProductManagement },
        ],
      },
    ],
  },
  {
    path: "Settings",
    element: Outlet,
    headChildren: [
      {
        path: "Warehouse",
        element: Warehouse,
        children: [],
      },
      {
        path: "Stock Entry",
        element: StockEntry,
        children: [],
      },
      {
        path: "Opening Stock",
        element: OpeningStock,
        children: [],
      },
    ],
  },
  {
    path: "Others",
    element: Outlet,
    headChildren: [
      {
        path: "Utilities",
        element: Outlet,
        children: [
          { path: "Customer Balance Confirmation", element: ProductManagement },
          { path: "Import", element: ProductManagement },
          { path: "Export Log", element: ProductManagement },
        ],
      },
      {
        path: "Setup",
        element: Outlet,
        children: [
          { path: "Company Details", element: ProductManagement },
          { path: "Branch", element: ProductManagement },
          { path: "Bill of Materials", element: ProductManagement },
          { path: "Configuration", element: ProductManagement },
          { path: "Organization Management", element: ProductManagement },
          { path: "Site Configuration", element: ProductManagement },
        ],
      },
      {
        path: "Users",
        element: User,
        children: [],
      },
    ],
  },
];
