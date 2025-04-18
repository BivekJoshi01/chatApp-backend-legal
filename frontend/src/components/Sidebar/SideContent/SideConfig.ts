import {
  FiHome,
  FiUsers,
  FiBox,
  FiShoppingCart,
  FiClipboard,
  FiSettings,
  FiPackage,
  FiBarChart2,
  FiFileText,
  FiDatabase,
  FiTool,
  FiBriefcase,
  FiUser,
  FiMapPin,
  FiMessageCircle,
} from "react-icons/fi";

export const getRoutesByHeadTab = ({ headTab }: { headTab: string }) => {
  switch (headTab) {
    case "Menu":
      return [
        { Icon: FiHome, title: "Home", hasSubmenu: false, submenu: [] },
        {
          Icon: FiUsers,
          title: "Customer/Suppliers",
          hasSubmenu: true,
          submenu: [
            { Icon: FiUsers, title: "Supplier/ Other Party" },
            { Icon: FiUsers, title: "Customer" },
            { Icon: FiMapPin, title: "Area" },
            { Icon: FiUser, title: "Agent" },
          ],
        },
        {
          Icon: FiBox,
          title: "Product",
          hasSubmenu: true,
          submenu: [
            { Icon: FiClipboard, title: "Product Management" },
            { Icon: FiClipboard, title: "Product Company" },
            { Icon: FiClipboard, title: "Product Group" },
            { Icon: FiClipboard, title: "Unit of Measurement" },
          ],
        },
        {
          Icon: FiShoppingCart,
          title: "Purchase",
          hasSubmenu: true,
          submenu: [
            { Icon: FiClipboard, title: "Invoice" },
            { Icon: FiClipboard, title: "Return" },
          ],
        },
        {
          Icon: FiShoppingCart,
          title: "Sales",
          hasSubmenu: true,
          submenu: [
            { Icon: FiClipboard, title: "Invoice" },
            { Icon: FiClipboard, title: "Return" },
          ],
        },
        {
          Icon: FiMessageCircle,
          title: "Chat",
          hasSubmenu: false,
          submenu: [],
        },
      ];
    case "Settings":
      return [
        {
          Icon: FiPackage,
          title: "Warehouse",
          hasSubmenu: false,
          submenu: [],
        },
        {
          Icon: FiPackage,
          title: "Stock Entry",
          hasSubmenu: false,
          submenu: [],
        },
        {
          Icon: FiDatabase,
          title: "Opening Stock",
          hasSubmenu: false,
          submenu: [],
        },
      ];
    case "Analytics":
      return [
        {
          Icon: FiBarChart2,
          title: "Account",
          hasSubmenu: true,
          submenu: [
            { Icon: FiFileText, title: "Day Book" },
            { Icon: FiFileText, title: "Cash Bank Book" },
            { Icon: FiFileText, title: "Account Ledger" },
            { Icon: FiFileText, title: "Account Ledger Summary" },
            { Icon: FiFileText, title: "Trial Balance" },
            { Icon: FiFileText, title: "Trial Balance Periodic" },
            { Icon: FiFileText, title: "Profit and Loss" },
            { Icon: FiFileText, title: "Profit and Loss Periodic" },
            { Icon: FiFileText, title: "Balance Sheet" },
            { Icon: FiFileText, title: "Opening Balance" },
          ],
        },
        {
          Icon: FiClipboard,
          title: "Documents",
          hasSubmenu: true,
          submenu: [
            { Icon: FiFileText, title: "Journal Voucher" },
            { Icon: FiFileText, title: "Receive Payment Voucher" },
            { Icon: FiFileText, title: "Debit Note" },
            { Icon: FiFileText, title: "Credit Note" },
          ],
        },
        {
          Icon: FiDatabase,
          title: "Chart Of Accounts",
          hasSubmenu: true,
          submenu: [
            { Icon: FiBriefcase, title: "Account Head" },
            { Icon: FiBriefcase, title: "Account Group" },
          ],
        },
      ];
    case "Others":
      return [
        {
          Icon: FiTool,
          title: "Utilities",
          hasSubmenu: true,
          submenu: [
            { Icon: FiFileText, title: "Customer Balance Confirmation" },
            { Icon: FiFileText, title: "Import" },
            { Icon: FiFileText, title: "Enter Log" },
          ],
        },
        {
          Icon: FiSettings,
          title: "Setup",
          hasSubmenu: true,
          submenu: [
            { Icon: FiBriefcase, title: "Company Details" },
            { Icon: FiBriefcase, title: "Branch" },
            { Icon: FiBriefcase, title: "Bill of Materials" },
            { Icon: FiSettings, title: "Configuration" },
            { Icon: FiUsers, title: "Organization Management" },
            { Icon: FiSettings, title: "Site Configuration" },
          ],
        },
        {
          Icon: FiUser,
          title: "Users",
          hasSubmenu: false,
          submenu: [],
        },
      ];
    default:
      return [];
  }
};
