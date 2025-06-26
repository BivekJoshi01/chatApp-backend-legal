import React, { ReactNode, useState } from "react";
import { Separator } from "../ui/separator";

interface FormModelProps {
  open: boolean;
  children: ReactNode;
  modelTitle?: string;
}

const FormModel: React.FC<FormModelProps> = ({
  open,
  children,
  modelTitle,
}) => {
  const [isShaking, setIsShaking] = useState(false);

  if (!open) return null;

  const handleOutsideClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-stone-950/50 z-50"
      onClick={handleOutsideClick}
    >
      <div
        className={`bg-foreground w-full min-w-[30%] sm:w-auto max-w-[95%] max-h-[90%] overflow-y-auto rounded-lg shadow-lg p-4 transition ${isShaking ? "shake" : ""
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center">
          <strong>{modelTitle}</strong>
        </div>
        <Separator className="my-2" />
        <div className="py-1 ">{children}</div>
      </div>

      <style>
        {`
          @keyframes shake {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(5px, -5px); }
            60% { transform: translate(-5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0, 0); }
          }
          .shake {
            animation: shake 0.5s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default FormModel;
