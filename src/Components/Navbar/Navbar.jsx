import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import { Link, useLocation } from "react-router";
import { RiCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import UserContext from "../../ContextApi/UserContext/UserContext";
import { TbLogout, TbLogout2 } from "react-icons/tb";
import Swal from "sweetalert2";

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [openMenu, setOpenMenu] = useState(false);
  const { user, logOut } = useContext(UserContext);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "LogOut Successful!",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "LogOut Failed!",
        });
      });
  };

  const navItem = <>
    <Link
      to="/"
      className={`text-[15px] leading-[24px] text-gray-800 font-medium  font-rubik  relative ${pathname === "/" ? "active" : ""
        }`}
    >
      Home
    </Link>
    <Link
      to="/available-cars"
      className={`text-[15px] leading-[24px] text-gray-800 font-medium  font-rubik    relative ${pathname === "/available-cars" ? "active" : ""
        }`}
    >
      Available Cars
    </Link>
    <Link
      to="/add-cars"
      className={`text-[15px] leading-[24px] text-gray-800 font-medium  font-rubik     relative ${pathname === "/add-cars" ? "active" : ""
        }`}
    >
      Add Car
    </Link>
    <Link
      to="/my-cars"
      className={`text-[15px] leading-[24px] text-gray-800 font-medium  font-rubik     relative ${pathname === "/my-cars" ? "active" : ""
        }`}
    >
      My Cars
    </Link>
    <Link
      to="/my-booking"
      className={`text-[15px] leading-[24px] text-gray-800 font-medium  font-rubik    relative ${pathname === "/my-booking" ? "active" : ""
        }`}
    >
      My Bookings
    </Link>
  </>

  return (
    <nav
      className={`z-100 ${scrollY > 50 ? "fixed-nav bg-white  relative " : "relative"
        } ${pathname === "/" ? " mb-0" : ""}`}
    >
      <div className="navbar w-11/12 mx-auto px-4 absolute inset-0  rounded-md">
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile menu button */}
          <div className="mobile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 lg:hidden cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>

            {/* Mobile menu */}
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-0 left-0 shadow bg-white text-black min-h-screen w-8/12 p-4 z-50"
                >
                  <div className="flex justify-between items-center my-4">
                    <Link className="text-xl font-bold flex items-center gap-1">
                      <img src="https://cdn-icons-png.flaticon.com/512/445/445005.png" alt="" className="w-6 h-6" />
                      <span className="font-rubik font-bold leading-4 tracking-wide text-2xl">RentRide</span>
                    </Link>
                    <button
                      onClick={() => setOpenMenu(false)}
                      className="p-1 bg-primary rounded-full text-white"
                    >
                      <RiCloseLine size={30} />
                    </button>
                  </div>
                  <ul className="menu menu-horizontal px-1 space-y-10 flex flex-col">
                    {navItem}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logo */}
          <Link className="text-xl font-bold flex items-center gap-1">
            <img src="https://cdn-icons-png.flaticon.com/512/445/445005.png" alt="" className="w-12 h-12" />
            <span className="font-rubik font-bold leading-4 tracking-wide text-2xl">RentRide</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-10">
            {navItem}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <button
              onClick={handleLogOut}
              className=""
            >
              <img src={user?.photoURL} alt="user profile images" className="w-10 h-10 object-contain rounded-full" />
            </button>
          ) : (
            <Link
              to="/login"
              className="md:px-4 px-2 md:py-2 py-1 font-bold text-md rounded-md cursor-pointer btn btn-outline border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-1"
            >
              <TbLogout size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
