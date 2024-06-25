import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageSearch, MdUploadFile } from "react-icons/md";
import { DropdownMenu } from "../DropdownMenu";
import { TbTopologyComplex } from "react-icons/tb";
import { CgPlayListRemove } from "react-icons/cg";
import { PiPathFill } from "react-icons/pi";

interface MainLayoutProps {
  children: ReactNode;
}

const mockDatabaseSize = {
  sqlSize: 4756, // 5 MB em kilobytes
  nosqlSize: 3200, // 4 MB em kilobytes
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const isActive = (pathname: string) => location.pathname === pathname;

  return (
    <div className="flex h-screen bg-theme-bg">
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex flex-row justify-center relative">
          <ul className="flex flex-row text-white gap-2 text-xs lg:text-sm">
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/post") && "bg-green-900"
              }`}
              onClick={() => navigate("/post")}
            >
              <MdUploadFile size={20} className="hidden lg:flex" />
              Envio de Dados
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/get") && "bg-green-900"
              }`}
              onClick={() => navigate("/get")}
            >
              <MdOutlineManageSearch size={20} className="hidden lg:flex" />
              Busca por Informações
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/update") && "bg-green-900"
              }`}
              onClick={() => navigate("/update")}
            >
              <TbTopologyComplex size={20} className="hidden lg:flex" />
              Atualizar Dados
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/delete") && "bg-green-900"
              }`}
              onClick={() => navigate("/delete")}
            >
              <CgPlayListRemove size={20} className="hidden lg:flex" />
              Excluir Informações
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/which-one") && "bg-green-900"
              }`}
              onClick={() => navigate("/which-one")}
            >
              <PiPathFill size={20} className="hidden lg:flex" />
              Qual devo usar?
            </li>
            <DropdownMenu />
          </ul>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-10">
            <div>
              <div>SQL : {mockDatabaseSize.sqlSize / 1000} megabytes</div>
              <div className="flex">
                <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${(mockDatabaseSize.sqlSize / 5000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div>NoSQL : {mockDatabaseSize.nosqlSize / 1000} megabytes</div>
              <div className="flex">
                <div className="w-full mt-4 bg-gray-200 rounded-full h-2.5 mb-4 border border-green-800">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${(mockDatabaseSize.nosqlSize / 5000) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
