import React, { useState } from "react";
import { Outlet } from "react-router";

import { motion } from "framer-motion";
import SidebarContent from "./SidebarContent";
import UseAuth from "../../Hook/useAuth/useAuth";
import Navbar from "./Navbar";

const DashBoardLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile aside
  const [isCollapsed, setIsCollapsed] = useState(false); // large device aside

const {user} = UseAuth()

  const isAdmin = user?.role === "admin";

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Sidebar - Large Device */}
      <aside
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-full
        bg-white dark:bg-gray-900 dark:text-white shadow transition-all duration-300 z-50
        ${isCollapsed ? "w-20" : "w-56"}`}
      >
        <SidebarContent user={user} isAdmin={isAdmin} collapsed={isCollapsed} />
      </aside>

      {/* Sidebar - Mobile */}
      <motion.aside
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed lg:hidden top-0 left-0 w-56 bg-white shadow h-full z-50"
      >
        <SidebarContent user={user} isAdmin={isAdmin} onClose={() => setIsOpen(false)} />
      </motion.aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
        ${isCollapsed ? "lg:ml-20" : "lg:ml-56"}`}
      >
        {/* Top Navbar */}
        <Navbar setIsCollapsed={setIsCollapsed} setIsOpen={setIsOpen} isOpen={isOpen} user={user} isCollapsed={isCollapsed}/>

        {/* Page Content */}
        <main className="p-2 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
