import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const isActive = (pathname: string) => location.pathname === pathname;

  return (
    <div className="flex h-screen bg-theme-bg">
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex flex-row justify-between">
          <ul className="flex flex-row text-white gap-2">
            <li
              className={`p-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-3 ${
                isActive("/home") && "bg-green-900"
              }`}
              onClick={() => navigate("/home")}
            >
              <MdOutlineDashboardCustomize size={20} />
            </li>
            <li
              className={`p-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-3 ${
                isActive("/settings") && "bg-green-900"
              }`}
              onClick={() => navigate("/settings")}
            >
              <IoSettingsOutline size={20} />
            </li>
            <li
              className={`p-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-3 ${
                isActive("/profile") && "bg-green-900"
              }`}
              onClick={() => navigate("/profile")}
            >
              <CgProfile size={20} />
            </li>
          </ul>
          <div className="flex flex-row gap-4 items-center">Menu do Perfil</div>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
