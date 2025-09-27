import React from "react";
import { MdOutgoingMail } from "react-icons/md";
import { Link } from "react-router";
import {
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareYoutube,
} from "react-icons/fa6";
import { BsFillSendCheckFill } from "react-icons/bs";
import Button from "../Button/Button";
import BackgroundImage from "../../assets/footer-banner.png";

const Footer = () => {
  return (
    <div
      className="font-rubik text-text"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/70 dark:bg-black/90 dark:text-white shadow border-t dark:border-gray-700 border-gray-200">
        <div className="w-11/12 mx-auto">
          <footer className="footer lg:footer-horizontal py-14">
            {/* Logo & Contact */}
            <aside>
              <Link className="text-xl font-bold flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/445/445005.png"
                  alt="Logo"
                  className="w-6 h-6"
                />
                <span className="text-2xl font-bold">RentRide</span>
              </Link>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-4">Contact Info</h2>
                <div className="text-sm space-y-2">
                  <p>+880-123456789</p>
                  <p>rentrideinfo@gmail.com</p>
                  <p>Dhaka Bangladesh</p>
                </div>
                <div className="flex items-center gap-4 text-2xl mt-5">
                  <Link to="https://www.facebook.com/mdsamiulislam2004/" target="blank">
                    <FaSquareFacebook className="hover:text-blue-500 transition" />
                  </Link>
                  <Link to="https://github.com/mdsamiulislam54" target="blank">
                    <FaSquareGithub className="hover:text-gray-400 transition" />
                  </Link>
                  <Link to="*">
                    <FaSquareInstagram className="hover:text-pink-500 transition" />
                  </Link>
                  <Link to="*">
                    <FaSquareYoutube className="hover:text-red-500 transition" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Services */}
            <nav>
              <h6 className="footer-title">Services</h6>
              <Link to="/" className="link link-hover">
                Home
              </Link>
              <Link to="/my-cars" className="link link-hover">
                My Cars
              </Link>
              <Link to="/my-booking" className="link link-hover">
                Booking Car
              </Link>
              <Link to="*" className="link link-hover">
                Advertisement
              </Link>
            </nav>

            {/* Company */}
            <nav>
              <h6 className="footer-title">Company</h6>
              <Link to="*" className="link link-hover">
                About us
              </Link>
              <Link to="*" className="link link-hover">
                Contact
              </Link>
              <Link to="*" className="link link-hover">
                Jobs
              </Link>
              <Link to="/available-cars" className="link link-hover">
                Available Cars
              </Link>
            </nav>

            {/* Newsletter */}
            <div>
              <div className="flex-1 max-lg:mb-8">
                <h4 className="text-xl font-bold tracking-wide">
                  Subscribe to our Newsletter to Get
                </h4>
                <h4 className="text-xl font-bold tracking-wide text-accent">
                  Updates on our Latest Collection
                </h4>
                <p className="text-sm my-2">
                  Get 20% off your first order just by subscribing!
                </p>
              </div>
              <form className="space-y-2 w-full">
                <div className="relative ">
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full p-3 pl-10 rounded-md border border-gray-300 text-black dark:text-white"
                  />
                  <span className="absolute top-2 text-accent left-2">
                    <MdOutgoingMail size={30} />
                  </span>
                </div>
                <Button icon={BsFillSendCheckFill} text={"Subscribe"} />
              </form>
            </div>
          </footer>

          {/* Bottom Bar */}
          <div className="text-center py-5 border-t dark:border-gray-700 border-gray-200">
            <p className="mb-0">© 2025 RentRide, All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
