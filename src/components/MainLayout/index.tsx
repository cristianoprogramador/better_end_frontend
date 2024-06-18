import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageSearch, MdUploadFile } from "react-icons/md";
import { DropdownMenu } from "../DropdownMenu";
import { TbTopologyComplex } from "react-icons/tb";
import { CgPlayListRemove } from "react-icons/cg";

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
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/post") && "bg-green-900"
              }`}
              onClick={() => navigate("/post")}
            >
              <MdUploadFile size={20} />
              Envio de Dados
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/get") && "bg-green-900"
              }`}
              onClick={() => navigate("/get")}
            >
              <MdOutlineManageSearch size={20} />
              Busca por Informações
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/update") && "bg-green-900"
              }`}
              onClick={() => navigate("/update")}
            >
              <TbTopologyComplex size={20} />
              Atualizar Dados
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/delete") && "bg-green-900"
              }`}
              onClick={() => navigate("/delete")}
            >
              <CgPlayListRemove size={20} />
              Excluir Informações
            </li>
          </ul>
          <div className="flex flex-row gap-4 items-center"><DropdownMenu /></div>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
