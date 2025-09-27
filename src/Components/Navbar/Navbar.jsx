import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { RiCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import UserContext from "../../ContextApi/UserContext/UserContext";
import { TbLogout } from "react-icons/tb";
import Swal from "sweetalert2";
import Button from "../Button/Button";
import { TiWeatherSunny } from "react-icons/ti";
import { DarkModetoggle } from "../../Hook/DarkMode/DarkMode";

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
      className={`text-[15px] leading-[24px] text-text font-medium  font-rubik  relative ${pathname === "/" ? "active" : ""
        }`}
    >
      Home
    </Link>
    <Link
      to="/about-us"
      className={`text-[15px] leading-[24px] text-text font-medium  font-rubik  relative ${pathname === "/about-us" ? "active" : ""
        }`}
    >
      About Us
    </Link>
    <Link
      to="/available-cars"
      className={`text-[15px] leading-[24px] text-text font-medium  font-rubik    relative ${pathname === "/available-cars" ? "active" : ""
        }`}
    >
      Available Cars
    </Link>


    <Link
      to="/blog"
      className={`text-[15px] leading-[24px] text-text font-medium  font-rubik    relative ${pathname === "/my-booking" ? "active" : ""
        }`}
    >
      Blog
    </Link>
    <Link
      to="/contact-us"
      className={`text-[15px] leading-[24px] text-text font-medium  font-rubik    relative ${pathname === "/contact-us" ? "active" : ""
        }`}
    >
      Contact Us
    </Link>
  </>

  return (
    <nav
      className={`z-100  ${pathname === "/"
        ? scrollY > 50
          ? "fixed-nav bg-white/95 dark:bg-black dark:text-white  shadow"
          : "absolute top-0 left-0 bg-transparent text-white w-full"
        : scrollY > 50
          ? "fixed-nav bg-white/95 dark:bg-black dark:text-white shadow"
          : "bg-white  dark:bg-black dark:text-white dark:shadow-gray-700  shadow"
        }`}
    >
      <div className={`navbar custom-container rounded-md `}>
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
          <button className="mx-4 cursor-pointer" onClick={DarkModetoggle}>
            <TiWeatherSunny size={30}/>
          </button>
          <div className="dropdown dropdown-end ">


            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full cursor-pointer">
                <img
                  alt="Profile img"
                  src={user?.photoURL || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2 font-rubik">
              <li>
                <Link className="justify-between">
                  Profile

                </Link>
              </li>
              <li className=""><Link to={'/dashboard'}>Dashboard</Link></li>
              <span className="ml-3">

                {
                  user ? (
                    <Button text={'Logout'} onClick={handleLogOut} icon={TbLogout} />

                  ) : (
                    <Link to={'/login'}><Button text={'Login'} icon={TbLogout} /></Link>
                  )
                }
              </span>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
