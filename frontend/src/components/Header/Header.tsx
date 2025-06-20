import React, { useState, useEffect, ReactNode } from "react";
import FormModel from "../Model/FormModel";
import Breadcrumb from "./BreadCrump/BreadCrump";
import GlobeImage from "../../assets/Office/GlobeImage.svg";
interface HeaderProps {
  children: ReactNode;
  modelWidth?: string;
  modelTitle?: string;
  buttonTitle?: string;
  buttonIcon?: ReactNode;
  openModel?: boolean;
  setOpenModel?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  children,
  modelWidth,
  modelTitle,
  buttonTitle,
  buttonIcon,
  openModel,
  setOpenModel
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
        <div className="flex items-center justify-between p-0.5">
          <div className="flex gap-2">
            <div className="w-8">
              <img src={GlobeImage} className="w-full h-full" />
            </div>
            <div>
              <span className="text-sm font-bold block">
                Universal Stationery Suppliers
              </span>
              <span className="text-xs block text-stone-500">
                <Breadcrumb />
              </span>
            </div>
          </div>

          <div className="text-sm  text-green-500">
            {time.toLocaleTimeString()}
          </div>
          {buttonTitle && setOpenModel ? (
            <button
              className="flex text-sm items-center gap-2 bg-primary-20 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
              // onClick={() => setOpenModel(true)}
              onClick={() => setOpenModel(true)}
            >
              {buttonIcon} <span>{buttonTitle}</span>
            </button>
          ) : <div></div>}
        </div>
      </div>
      {/* {openModel && (
        <FormModel
          open={openModel}
          width={modelWidth}
          modelTitle={modelTitle}
        >
          {children}
        </FormModel>
      )} */}
      {openModel && setOpenModel && (
        <FormModel open={openModel} width={modelWidth} modelTitle={modelTitle}>
          {children}
        </FormModel>
      )}
    </>
  );
};

export default Header;
