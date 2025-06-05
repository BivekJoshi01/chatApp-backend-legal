import React from "react";
import { FiArrowDownRight, FiKey, FiUser } from "react-icons/fi";
import { useLogoutHook } from "../../../../api/auth/auth-hook";

interface PopoverCustomProps {
  isPopoverVisible: boolean;
}

const PopoverCustom: React.FC<PopoverCustomProps> = ({ isPopoverVisible }) => {
  const { mutate: logout } = useLogoutHook();

  const handleProfile = () => { };
  const handleChangePassword = () => { };
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="absolute top-12 right-1 z-[100]">
      {isPopoverVisible && (
        <div
          id="popover-right"
          role="tooltip"
          className="w-64 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-lg dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="px-4 py-3 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-700 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Actions
            </h3>
          </div>

          {/* Menu Items */}
          <div
            onClick={handleProfile}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <FiUser className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            <span>Profile</span>
          </div>
          <div
            onClick={handleChangePassword}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
          >
            <FiKey className="h-5 w-5 text-gray-500 dark:text-gray-300" />
            <span>Change Password</span>
          </div>
          <div
            onClick={handleLogout}
            className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer flex items-center gap-2 text-red-600 dark:text-red-400"
          >
            <FiArrowDownRight className="h-5 w-5" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopoverCustom;
