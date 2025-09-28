import { Menu, X, Sun, Bell, LayoutDashboard, Users, CalendarClock, Car, CarFront, ClipboardList, Home }
    from "lucide-react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { RiAddBoxFill,RiStickyNoteAddFill  } from "react-icons/ri";
import { BsFillHouseAddFill } from "react-icons/bs";

const SidebarContent = ({ user, isAdmin, collapsed, onClose }) => {
    const menuItems = [
        { to: "/dashboard", label: "Dashboard Home", icon: <LayoutDashboard size={18} /> },
        ...(isAdmin
            ? [
                { to: "/dashboard/manage/user", label: "Manage Users", icon: <Users size={18} /> },
                { to: "/dashboard/manage-booking", label: "Manage Booking Car", icon: <CalendarClock size={18} /> },
                { to: "/dashboard/my-cars", label: "Manage All Cars", icon: <CarFront size={18} /> },
                { to: "/dashboard/add/blogs", label: "Add Blogs", icon: <RiAddBoxFill size={18} /> },
                { to: "/dashboard/manage/blogs", label: "Manage Blogs", icon: <RiStickyNoteAddFill size={18} /> },
                
            ]
            : [
                { to: "/dashboard/my-booking-cars", label: "My Booking Cars", icon: <ClipboardList size={18} /> },
                {
                    to: "/dashboard/my-cars", label: "My Cars", icon: <CarFront size={18} />
                },
                {
                    to: "/dashboard/add-car", label: "Add Car", icon: <Car size={18} />
                }

            ]),
        { to: "/", label: "Back to Home", icon: <BsFillHouseAddFill size={18} /> },
    ];

    return (
        <div className="h-full flex flex-col relative">
              <div className="absolute top-4 right-2 md:hidden ">
                    <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full font-bold cursor-pointer">
                        <IoClose size={20}/>
                    </button>
                </div>
            <div className="flex justify-center items-center my-12 ">
              
                <Link className="text-xl font-bold flex items-center gap-1">
                    <img src="https://cdn-icons-png.flaticon.com/512/445/445005.png" alt="" className="w-6 h-6" />
                    
                    {!collapsed && <span className="font-rubik font-bold leading-4 tracking-wide text-2xl">RentRide</span> }
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 p-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                to={item.to}
                                onClick={onClose}
                                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-accent font-rubik text-sm text-gray-800 dark:text-gray-100"
                            >
                                {item.icon}
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarContent