import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { IconType } from "react-icons";
import { getRoutesByHeadTab } from "./SideConfig";
import { IoMdArrowDropdown } from "react-icons/io";

interface RouteSelectProps {
  headTab: string;
}

const RouteSelect: React.FC<RouteSelectProps> = ({ headTab }) => {
  const navigate = useNavigate();
  const { selected } = useParams();
  const [selectedRoute, setSelectedRoute] = useState<string>(selected || "Home");
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    if (selected) {
      setSelectedRoute(selected);
    }
  }, [selected]);

  const routes = getRoutesByHeadTab({ headTab });

  // const handleRouteClick = (title: string, hasSubmenu: boolean) => {
  //   setSelectedRoute(title);
  //   setOpenSubmenu(hasSubmenu ? (openSubmenu === title ? null : title) : null);

  //   navigate(`/${headTab}/${title}`);
  // };

  const handleRouteClick = (title: string, hasSubmenu: boolean, submenu?: { title: string }[]) => {
    setSelectedRoute(title);
    setOpenSubmenu(hasSubmenu ? (openSubmenu === title ? null : title) : null);

    if (hasSubmenu && submenu && submenu.length > 0) {
      navigate(`/${headTab}/${title}/${submenu[0].title}`);
    } else {
      navigate(`/${headTab}/${title}`);
    }
  };


  return (
    <div className="space-y-1">
      {routes.map(({ Icon, title, hasSubmenu, submenu }) => (
        <Route
          key={title}
          Icon={Icon}
          selected={selectedRoute === title}
          title={title}
          hasSubmenu={hasSubmenu}
          submenu={submenu}
          onClick={() => handleRouteClick(title, hasSubmenu, submenu)}
          isSubmenuOpen={openSubmenu === title}
          headTab={headTab}
          navigate={navigate}
        />
      ))}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  onClick,
  isSubmenuOpen,
  hasSubmenu,
  submenu,
  headTab,
  navigate,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  onClick: () => void;
  isSubmenuOpen: boolean;
  hasSubmenu: boolean;
  submenu: { Icon: IconType; title: string }[];
  headTab: string;
  navigate: (path: string) => void;
}) => {
  // console.log("🚀 ~ submenu:", submenu)
  const [activeSubmenuItem, setActiveSubmenuItem] = useState<string | null>(submenu[0]?.title);

  const handleSubmenuItemClick = (submenuTitle: string) => {
    setActiveSubmenuItem(submenuTitle);
    navigate(`/${headTab}/${title}/${submenuTitle}`);
  };

  return (
    <div>
      <button
        onClick={onClick}
        className={`flex items-center justify-between gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${selected ? "bg-primary-30 text-text shadow" : "hover:bg-primary-10 bg-transparent text-stone-500 shadow-none"
          }`}
      >
        <div className="flex items-center gap-2">
          <Icon className={selected ? "text-violet-500" : ""} />
          <span>{title}</span>
        </div>
        {hasSubmenu && <IoMdArrowDropdown className={`${isSubmenuOpen ? "rotate-180" : ""} transition-transform`} />}
      </button>

      {hasSubmenu && isSubmenuOpen && (
        <div className="ml-8 mt-2 space-y-2">
          {submenu?.map((item, index) => (
            <button
              key={index}
              className={`flex items-center gap-2 text-sm text-stone-600 w-full text-left hover:text-stone-800 py-1 px-1 rounded ${activeSubmenuItem === item.title ? "bg-primary-20 text-text shadow" : "hover:bg-primary-10 bg-transparent text-stone-500 shadow-none"}`}
              onClick={() => handleSubmenuItemClick(item.title)}
            >
              <item.Icon className={activeSubmenuItem === item.title ? "text-violet-500" : ""} />
              {item?.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouteSelect;
