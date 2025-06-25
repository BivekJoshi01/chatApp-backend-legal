import React from "react";
import {
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
} from "../../ui/drawer";

const LetterHead = () => {
  return (
    <div >
      <DrawerHeader className="bg-gray-100 p-4 border-b">
        <DrawerTitle className="text-lg font-semibold">Letter Head</DrawerTitle>
        <DrawerClose className="text-sm text-blue-600 hover:underline mt-1">
          Close
        </DrawerClose>
      </DrawerHeader>

      <div >
        {/* Your main content goes here */}
        <p className="text-gray-700">
          This is the Letter Head drawer content. You can place forms or components here.
        </p>
      </div>
    </div>
  );
};

export default LetterHead;
