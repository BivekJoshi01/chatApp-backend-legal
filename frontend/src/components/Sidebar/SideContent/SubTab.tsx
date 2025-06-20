import { FiSettings, FiMapPin } from "react-icons/fi";
import { RiFileList2Fill } from "react-icons/ri";
import RouteSelect from "./RouteSelect";

interface SubTabProps {
  headTab: string;
  setHeadTab: React.Dispatch<React.SetStateAction<string>>;
}

const SubTab: React.FC<SubTabProps> = ({ headTab, setHeadTab }) => {
  const tabs = [
    { id: "Menu", label: "Menu", icon: null },
    { id: "Settings", label: null, icon: <FiSettings /> },
    { id: "Analytics", label: null, icon: <FiMapPin /> },
    { id: "Others", label: null, icon: <RiFileList2Fill /> },
  ];

  return (
    <div>
      <div className="flex justify-center gap-4 mb-1">
        {tabs.map((tab) => {
          const isActive = headTab === tab.id;

          return (
            <div
              key={tab.id}
              onClick={() => setHeadTab(tab.id)}
              className={`px-4 pt-2 cursor-pointer transition-all duration-200 rounded-t text-sm flex items-center gap-1 
              ${isActive
                  ? "border-t border-l border-r bg-primary-10"
                  : "hover:bg-stone-200 text-stone-500"
                }
            `}
            >
              {tab.icon && <span className="text-sm">{tab.icon}</span>}
              {tab.label && <span className="text-sm">{tab.label}</span>}
            </div>
          );
        })}
      </div>
      <RouteSelect headTab={headTab} />
    </div>
  );
};

export default SubTab;
