import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/icons/logo.png";
import { Link, useLocation } from "react-router";
import { RiCloseLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import UserContext from "../../ContextApi/UserContext/UserContext";

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogOut = () => {
    //logOut user
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

  return (
    <nav
      className={`    py-2 z-100 ${
        scrollY > 50 ? "fixed-nav bg-white/90 shadow" : ``
      }  ${
        pathname === "/"
          ? "absolute top-0 left-0 w-full text-white"
          : "shadow  "
      } `}
    >
      <div className="navbar   w-11/12 mx-auto px-4">
        <div className="navbar-start">
          <div className="mobile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 lg:hidden cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
            <AnimatePresence>
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -200 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute top-0 left-0 shadow bg-white text-black min-h-screen w-8/12  p-4 z-50"
                >
                  <div className="flex justify-between items-center my-4">
                    <Link className="text-xl font-bold flex justify-center items-center gap-1">
                      <img src={logo} alt="" className="w-6 h-6" />
                      <span className="text-primary">RentRide</span>
                    </Link>
                    <button
                      onClick={() => setOpenMenu(!openMenu)}
                      className="p-1 bg-primary rounded-full text-white cursor-pointer"
                    >
                      <RiCloseLine size={30} />
                    </button>
                  </div>
                  <ul className="menu menu-horizontal px-1 space-y-10 flex flex-col  ">
                    <Link
                      to={"/"}
                      className="text-lg font-bold navlink relative "
                    >
                      Home
                    </Link>
                    <Link
                      to={"available-cars"}
                      className="text-lg font-bold navlink relative "
                    >
                      Available Cars
                    </Link>
                    <Link
                      to={"add-cars"}
                      className="text-lg font-bold navlink relative "
                    >
                      Add Car
                    </Link>
                    <Link
                      to={"my-cars"}
                      className="text-lg font-bold navlink relative "
                    >
                      My Cars
                    </Link>
                    <Link
                      to={"my-booking"}
                      className="text-lg font-bold navlink relative "
                    >
                      {" "}
                      My Bookings{" "}
                    </Link>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link className="text-xl font-bold flex justify-center items-center gap-1">
            <img src={logo} alt="" className="w-6 h-6" />
            <span className="text-">RentRide</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 space-x-10  ">
            <Link to={"/"} className="text-lg font-bold navlink relative ">
              Home
            </Link>
            <Link
              to={"available-cars"}
              className="text-lg font-bold navlink relative "
            >
              Available Cars
            </Link>

            {user && (
              <div className="space-x-10">
                <Link
                  to={"add-cars"}
                  className="text-lg font-bold navlink relative "
                >
                  Add Car
                </Link>
                <Link to={"my-cars"} className="text-lg font-bold navlink relative ">
                  My Cars
                </Link>
                <Link  to={"my-booking"} className="text-lg font-bold navlink relative ">
                  {" "}
                  My Bookings{" "}
                </Link>
              </div>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <Link
              onClick={handleLogOut}
              className="px-10 py-2 bg-primary text-white font-bold text-xl rounded-md cursor-pointer"
            >
              Logout
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="px-10 py-2 bg-primary text-white font-bold text-xl rounded-md cursor-pointer"
            >
              login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
