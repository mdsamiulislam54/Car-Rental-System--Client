import React, { useState } from "react";
import { Outlet } from "react-router";
import {
  Menu,
  Sun,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import SidebarContent from "./SidebarContent";

const DashBoardLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile aside
  const [isCollapsed, setIsCollapsed] = useState(false); // large device aside

  const user = {
    displayName: "Md. Shamiul Islam",
    email: "samiul@example.com",
    photoURL: "https://i.ibb.co/4W2DGKm/default-user.png",
    role: "admin",
  };

  const isAdmin = user.role === "admin";

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Sidebar - Large Device */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-full
        bg-white shadow transition-all duration-300 z-50
        ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <SidebarContent user={user} isAdmin={isAdmin} collapsed={isCollapsed} />
      </aside>

      {/* Sidebar - Mobile */}
      <motion.aside
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed lg:hidden top-0 left-0 w-64 bg-white shadow h-full z-50"
      >
        <SidebarContent user={user} isAdmin={isAdmin} onClose={() => setIsOpen(false)} />
      </motion.aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white p-4 shadow sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Hamburger (Mobile) */}
            <button
              className="p-2 rounded-md hover:bg-gray-200 lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu size={22} />
            </button>
            {/* Collapse Button (Large Device) */}
            <button
              className="p-2 rounded-md hover:bg-gray-200 hidden lg:block"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={22} />
            </button>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 w-40 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <Sun size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="p-2 hover:bg-gray-200 rounded-full">
                <Bell size={20} />
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                5
              </span>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-8 h-8 rounded-full border"
              />
              <span className="hidden sm:block font-medium">{user.displayName}</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
