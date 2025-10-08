import {
  Menu,
  Sun,
  Bell,
} from "lucide-react";
import { DarkModetoggle } from "../../Hook/DarkMode/DarkMode";

const Navbar = ({setIsOpen,setIsCollapsed,user,isCollapsed, isOpen}) => {
    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-900 dark:text-white dark:shadow-gray-600 p-4 shadow sticky top-0 z-40">
            <div className="flex items-center gap-3">
                {/* Hamburger (Mobile) */}
                <button
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer  lg:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={22} />
                </button>
                {/* Collapse Button (Large Device) */}
                <button
                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer hidden lg:block"
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

            <div className="flex items-center md:gap-4 gap-1">
                {/* Theme Toggle */}
                <button
                onClick={DarkModetoggle}
                className="mx-1  rounded-full cursor-pointer ">
                    <Sun size={20} />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button className="p-2 hover:bg-gray-200 rounded-full">
                        <Bell size={16} />
                    </button>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                        5
                    </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-2">
                    <img
                        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN3-b6hE_5K-l4bv_gBuFtF5zWoPEhSkLsuw&s"}
                        alt="Profile"
                        className="md:w-8 md:h-8 w-5 h-5 rounded-full border"
                    />
                    <span className="hidden sm:block font-medium">{user?.displayName}</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar