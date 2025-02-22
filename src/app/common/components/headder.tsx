"use client";

import React, { JSX, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IHeaderProps } from "./interface/interface";
import menuItems from "@/app/path.json";
import { FaBars, FaInfoCircle, FaStickyNote, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const iconMap: Record<string, JSX.Element> = {
  about: <FaInfoCircle className="mr-2" />,
  notes: <FaStickyNote className="mr-2" />,
  accounts: <FaUser className="mr-2" />,
  login: <FaUser className="mr-2" />,
};

const Header: React.FC<IHeaderProps> = ({ title = "Keep Notes" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menu, setMenu] = useState(menuItems);

  useEffect(() => {
    const activeUser = localStorage.getItem("activeUser");
    setUser(activeUser);
  }, [pathname]);

  useEffect(() => {
    setMenu(
      menuItems.map((item) => ({
        ...item,
        active: pathname === item.path,
      }))
    );
  }, [pathname]);

  const handleMenuClick = (id: number, path?: string) => {
    if (!user) {
      router.push("/login");
      return;
    }

    setMenu((prevMenu) =>
      prevMenu.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );

    if (path) router.push(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-between items-center p-4  shadow-md  bg-purple-200">
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <FaBars className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 md:ml-10 lg:ml-40">
          {title}
        </h1>

        <div className="hidden md:flex gap-6 items-center">
          {menu.map((item) => {
            if (
              (!user && item.key !== "login") ||
              (user && item.key === "login")
            )
              return null;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id, item.path)}
                className={`flex items-center text-lg font-medium ${
                  item.active ? "text-blue-600 font-bold" : "text-gray-800"
                }`}
              >
                {iconMap[item.key]}
                {item.label}
              </button>
            );
          })}
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center text-lg font-medium text-red-500"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          )}
        </div>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="bg-white w-64 h-full p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {menu.map((item) => {
              if (
                (!user && item.key !== "login") ||
                (user && item.key === "login")
              )
                return null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id, item.path)}
                  className={`flex items-center w-full text-left py-2 text-lg font-medium ${
                    item.active ? "text-blue-600 font-bold" : "text-gray-800"
                  }`}
                >
                  {iconMap[item.key]}
                  {item.label}
                </button>
              );
            })}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left py-2 text-lg font-medium text-red-500"
              >
                <FiLogOut className="mr-2" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
