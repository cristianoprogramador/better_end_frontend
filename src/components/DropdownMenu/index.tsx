// src/components/DropdownMenu.tsx

import React, { useState, useRef, useEffect, useContext } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import profileImg from "@/assets/images/user-profile.png";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "@/contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

interface DropdownMenuProps {}

export const DropdownMenu: React.FC<DropdownMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signInByGoogle, user, isAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmDelete = window.confirm("tem certeza?");
    if (!confirmDelete) return;
    console.log("Saiu");
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const token = tokenResponse.access_token;
        await signInByGoogle(token);
      } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const profileImageUrl =
  user?.profileImageUrl &&
  user.profileImageUrl.trim() !== ""
    ? user.profileImageUrl
    : profileImg;

  return (
    <div className="relative rounded-lg ml-4 text-black" ref={dropdownRef}>
      {isAuthenticated ? (
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            googleLogin();
          }}
          className="px-4 py-2 bg-white border rounded shadow flex items-center gap-2"
        >
          <FcGoogle size={20} />
          <div className="font-semibold">Login</div>
        </button>
      )}

      {isOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 min-w-48 bg-white border rounded shadow-lg z-10">
          <div className="bg-gray-300 h-14 relative">
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full overflow-hidden relative mt-3">
                <img
                  src={profileImageUrl}
                  alt="ProfileBig"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center ">
            <div className="text-sm">{user?.name}</div>
            <div className="text-xs">{user?.email}</div>
          </div>
          <div className="mt-4">
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
