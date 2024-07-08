import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageSearch, MdUploadFile } from "react-icons/md";
import { TbTopologyComplex } from "react-icons/tb";
import { CgPlayListRemove } from "react-icons/cg";
import { PiPathFill } from "react-icons/pi";
import logo from "@/assets/images/Logo.png";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

interface MainLayoutProps {
  children: ReactNode;
}

const mockDatabaseSize = {
  sqlSize: 7180, // 5 MB em kilobytes
  nosqlSize: 5270, // 4 MB em kilobytes
};

const DatabaseWall: React.FC<{ size: number }> = ({ size }) => {
  const brickWidth = 4;
  const sizePerBrick = 250; // 250 kilobytes per brick
  const bricksPerRow = 40; // Maximum bricks per row
  const numberOfBricks = Math.ceil(size / sizePerBrick);

  return (
    <div
      className="flex flex-wrap gap-1"
      style={{ width: brickWidth * bricksPerRow }}
    >
      {Array.from({ length: numberOfBricks }).map((_, index) => (
        <div
          key={index}
          style={{ width: brickWidth, height: brickWidth }}
          className="bg-green-600"
        ></div>
      ))}
    </div>
  );
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const isActive = (pathname: string) => location.pathname === pathname;

  return (
    <div className="flex h-screen bg-theme-bg">
      <div className="flex-1 flex flex-col">
        <div className="p-4 flex flex-row justify-center">
          <div className="absolute left-0 xl:top-4 top-20 hidden md:flex">
            <img
              src={logo}
              alt=""
              className="w-48 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <ul className="flex flex-row text-white gap-2 text-xs lg:text-sm">
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/post") && "bg-green-900"
              }`}
              onClick={() => navigate("/post")}
            >
              <MdUploadFile size={20} className="hidden lg:flex" />
              Data Submission
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/get") && "bg-green-900"
              }`}
              onClick={() => navigate("/get")}
            >
              <MdOutlineManageSearch size={20} className="hidden lg:flex" />
              Search for Information
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/update") && "bg-green-900"
              }`}
              onClick={() => navigate("/update")}
            >
              <TbTopologyComplex size={20} className="hidden lg:flex" />
              Update data
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/delete") && "bg-green-900"
              }`}
              onClick={() => navigate("/delete")}
            >
              <CgPlayListRemove size={20} className="hidden lg:flex" />
              Delete Information
            </li>
            <li
              className={`px-4 py-2 hover:bg-green-700 bg-green-500 rounded-lg cursor-pointer flex flex-row items-center gap-2 ${
                isActive("/which-one") && "bg-green-900"
              }`}
              onClick={() => navigate("/which-one")}
            >
              <PiPathFill size={20} className="hidden lg:flex" />
              Which should I use?
            </li>
          </ul>
        </div>
        <div className="w-full flex flex-col mb-4 justify-center items-center gap-4">
          <div className="flex flex-row justify-center items-center gap-10">
            <div>
              <div>SQL : {mockDatabaseSize.sqlSize / 1000} megabytes</div>
              <DatabaseWall size={mockDatabaseSize.sqlSize} />
            </div>
            <div>
              <div>NoSQL : {mockDatabaseSize.nosqlSize / 1000} megabytes</div>
              <DatabaseWall size={mockDatabaseSize.nosqlSize} />
            </div>
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">{children}</main>

        <footer className="w-full p-4 bg-white shadow text-center text-sm relative">
          <div className="absolute right-10 bottom-1 flex flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/cristiano-pereira-da-silva-bb991a124/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={20} className="hover:opacity-80"/>
            </a>
            <a
              href="https://cristianosilvadev.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaHome size={20} className="hover:opacity-80"/>
            </a>
            <a
              href="https://www.youtube.com/channel/UCsxEJaQnDvadd2TIBmc58Aw"
              target="_blank"
              rel="noreferrer"
            >
              <IoLogoYoutube size={20} className="hover:opacity-80"/>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
